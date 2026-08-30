#!/usr/bin/env bash
#
# A/B harness for the daisyUI → Base UI migration.
#
# Builds the reference commit in a worktree and HEAD in place, serves both, and
# compares them in one browser on one machine — so there are no baseline images
# in git and nothing to drift when the OS or the font stack changes.
#
#   REF=<sha> scripts/ab.sh              # full matrix
#   REF=<sha> scripts/ab.sh --pages      # page screenshots only
#   REF=<sha> scripts/ab.sh --styles     # computed styles only
#   REF=<sha> scripts/ab.sh --no-build   # reuse both builds
#
# Two oracles, because neither is sufficient alone:
#
#   pixel   `diff screenshot -t 0.05`. Catches geometry — size, spacing,
#           borders, radii, layout. Measured blind to colour drift below ~1%
#           lightness, and measured to have a 0-2px jitter floor on a full page.
#   styles  exact string equality on resolved computed values. Catches every
#           colour, and it is the ONLY thing that can see daisyUI's :hover,
#           :active and :focus-visible, which are pure color-mix() shifts.
#
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."

REF=${REF:?set REF to the reference commit, e.g. REF=\$(git rev-parse stage-0)}
PORT_REF=${PORT_REF:-3001}
PORT_NEW=${PORT_NEW:-3000}
OUT=.ab
# Deliberately OUTSIDE the repo. Nested, Next walks up, finds the parent's
# bun.lock, and picks the parent as the workspace root — so the reference build
# resolves HEAD's node_modules instead of its own. Harmless today; wrong the
# moment the two sides stop sharing a dependency set, which is the entire point
# of this migration.
WT=${AB_WT:-$PWD/../.portfolio-ab-ref}
# Pixel budget per full page. The measured jitter floor is 0-2 on 3.26M pixels;
# anything above this is a real geometry change, not capture noise.
BUDGET=${BUDGET:-8}
THRESH=${THRESH:-0.05}

URLS=(
  /
  /about
  /work
  /work/surface-evolver
  /work/recipe-diary
  /work/noise-induced-errors-in-variational-quantum-eigensolvers
  /kitchen-sink
)
THEMES=(light dark)
VIEWPORTS=(390x844 768x1024 1280x900)
# Specimens whose interaction states carry style of their own.
INTERACTIVE=(btn-default btn-primary btn-ghost btn-square btn-anchor
  link-plain link-hover link-primary togglegroup toggle-off)

DO_PAGES=1 DO_STYLES=1 DO_BUILD=1
for a in "$@"; do case $a in
  --pages) DO_STYLES=0 ;;
  --styles) DO_PAGES=0 ;;
  --no-build) DO_BUILD=0 ;;
  *) echo "unknown flag: $a" >&2; exit 2 ;;
esac; done

mkdir -p "$OUT"/{ref,diff,styles}
FAILURES=$OUT/failures.txt
: >"$FAILURES"

# ---------------------------------------------------------------- build

if [[ $DO_BUILD == 1 ]]; then
  echo "==> reference worktree @ $REF"
  if [[ -d $WT ]]; then
    git -C "$WT" checkout -q --detach "$REF"
  else
    git worktree add -q --detach "$WT" "$REF"
  fi
  # Separate install: the reference has daisyUI, HEAD increasingly does not.
  (cd "$WT" && bun install --silent && NEXT_PUBLIC_E2E=1 bun run build >/dev/null)

  echo "==> HEAD build"
  NEXT_PUBLIC_E2E=1 bun run build >/dev/null
fi

# ---------------------------------------------------------------- serve

PIDS=()
cleanup() {
  [[ ${#PIDS[@]} -gt 0 ]] && kill "${PIDS[@]}" 2>/dev/null || true
  agent-browser --session ab-ref close >/dev/null 2>&1 || true
  agent-browser --session ab-new close >/dev/null 2>&1 || true
}
trap cleanup EXIT

serve() { # dir port
  # A stale `next start` on this port will answer the health check below and
  # serve an older build whose CSS chunks no longer exist on disk — which
  # renders unstyled and reads as a 100%-different page. Refuse the port
  # rather than compare against a ghost.
  if lsof -ti :"$2" >/dev/null 2>&1; then
    echo "port $2 is already in use — stop it first (lsof -ti :$2 | xargs kill)" >&2
    return 1
  fi

  (cd "$1" && exec bunx next start -p "$2") >"$OUT/server-$2.log" 2>&1 &
  local pid=$!
  PIDS+=("$pid")

  for _ in $(seq 60); do
    # If the child died (EADDRINUSE, build missing), stop waiting.
    kill -0 "$pid" 2>/dev/null || break
    curl -sf -o /dev/null "http://localhost:$2/" && { assert_styled "$2" && return 0 || return 1; }
    sleep 0.5
  done
  echo "server on $2 never came up; see $OUT/server-$2.log" >&2
  return 1
}

# Every stylesheet the page references must actually load. This is the check
# that catches a served-but-broken build, which otherwise looks like a total
# visual regression rather than a harness fault.
assert_styled() { # port
  local href code n=0
  for href in $(curl -s "http://localhost:$1/" | grep -o 'href="[^"]*\.css"' | sed 's/href="//;s/"//'); do
    code=$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:$1$href")
    [[ $code == 200 ]] || {
      echo "server on $1 serves $href as HTTP $code — stale or broken build" >&2
      return 1
    }
    n=$((n + 1))
  done
  [[ $n -gt 0 ]] || { echo "server on $1 references no stylesheet" >&2; return 1; }
  return 0
}
echo "==> serving ref:$PORT_REF new:$PORT_NEW"
serve "$WT" "$PORT_REF"
serve . "$PORT_NEW"

# ---------------------------------------------------------------- helpers

ab() { agent-browser --session "$1" "${@:2}"; }

# Reads .data.<key> out of an agent-browser --json response.
jget() { python3 -c "import json,sys;print(json.load(sys.stdin)['data']$1)"; }

setup_side() { # session theme w h
  ab "$1" set viewport "$3" "$4" >/dev/null
  ab "$1" set media "$2" reduced-motion >/dev/null

  # The three /work detail pages embed a YouTube iframe. Its content is remote
  # and renders differently run to run — measured at 10-12 differing pixels,
  # which is indistinguishable from a small real regression. Abort the requests
  # so the iframe is a deterministic empty box on both sides. Everything else
  # the site loads is local.
  ab "$1" network route "**youtube.com**" --abort >/dev/null 2>&1 || true
  ab "$1" network route "**youtube-nocookie.com**" --abort >/dev/null 2>&1 || true
  ab "$1" network route "**ytimg.com**" --abort >/dev/null 2>&1 || true
}

fail() { echo "FAIL  $*" | tee -a "$FAILURES"; }
pass() { echo "ok    $*"; }

# ---------------------------------------------------------------- pages

if [[ $DO_PAGES == 1 ]]; then
  echo
  echo "==> page comparisons"
  for theme in "${THEMES[@]}"; do
    for vp in "${VIEWPORTS[@]}"; do
      w=${vp%x*} h=${vp#*x}
      setup_side ab-ref "$theme" "$w" "$h"
      setup_side ab-new "$theme" "$w" "$h"
      for url in "${URLS[@]}"; do
        slug=$(echo "${url#/}" | tr / _); slug=${slug:-home}
        cell="$slug-$theme-$w"
        base="$OUT/ref/$cell.png"

        ab ab-ref open "http://localhost:$PORT_REF$url" >/dev/null
        ab ab-ref screenshot --full html "$base" >/dev/null

        ab ab-new open "http://localhost:$PORT_NEW$url" >/dev/null
        px=$(ab ab-new diff screenshot --full --baseline "$base" \
              -t "$THRESH" -o "$OUT/diff/$cell.png" --json \
              | jget "['differentPixels']")

        if [[ $px -le $BUDGET ]]; then pass "$cell ($px px)"
        else fail "$cell — $px px > $BUDGET (see $OUT/diff/$cell.png)"; fi
      done
    done
  done
fi

# ---------------------------------------------------------------- styles

probe() { # session port -> stdout json
  ab "$1" open "http://localhost:$2/kitchen-sink" >/dev/null
  ab "$1" mouse move 2 2 >/dev/null

  python3 - "$1" "${INTERACTIVE[@]}" <<'PY'
import json, subprocess, sys

sess, specimens = sys.argv[1], sys.argv[2:]
src = open('scripts/probe.js').read()


def ev():
    """Probe every specimen. `eval` reuses one JS context, so probe.js is an
    IIFE — a bare top-level `const` throws 'already declared' on call two."""
    r = subprocess.run(['agent-browser', '--session', sess, 'eval', '--stdin',
                        '--json'], input=src, capture_output=True, text=True)
    return json.loads(r.stdout)['data']['result']


def act(*args):
    subprocess.run(['agent-browser', '--session', sess, *args],
                   capture_output=True, text=True)


def settle():
    """Let the state transition finish before sampling.

    `.btn` transitions colour and box-shadow over 200ms and — unlike `.swap` —
    daisyUI does not guard that behind prefers-reduced-motion, so `set media
    reduced-motion` does not stop it. Sampling immediately after a hover reads
    a frame mid-flight: measured alpha 0.359 on one side and 0.441 on the
    other, from identical CSS.
    """
    act('wait', '300')


out = {k: {'rest': v} for k, v in ev().items()}

# :hover, :focus-visible and :active cannot be forced from JS — they have to be
# driven for real. Each probe returns every specimen, so only the acted-on
# entry is kept.
for tid in specimens:
    sel = f'[data-testid="{tid}"] > *'

    act('hover', sel)
    settle()
    out[tid]['hover'] = ev()[tid]

    # .focus() alone does not arm :focus-visible in Chrome; the focus has to
    # arrive from the keyboard. Tab away and back.
    act('mouse', 'move', '2', '2')
    act('focus', sel)
    act('press', 'Shift+Tab')
    act('press', 'Tab')
    settle()
    out[tid]['focus'] = ev()[tid]

    act('mouse', 'move', '2', '2')
    settle()

json.dump(out, sys.stdout, indent=1, sort_keys=True)
PY
}

if [[ $DO_STYLES == 1 ]]; then
  echo
  echo "==> computed styles"
  for theme in "${THEMES[@]}"; do
    setup_side ab-ref "$theme" 1280 900
    setup_side ab-new "$theme" 1280 900
    probe ab-ref "$PORT_REF" >"$OUT/styles/ref-$theme.json"
    probe ab-new "$PORT_NEW" >"$OUT/styles/new-$theme.json"

    if python3 scripts/styles-diff.py "$OUT/styles/ref-$theme.json" "$OUT/styles/new-$theme.json"; then
      pass "styles-$theme"
    else
      fail "styles-$theme — see output above"
    fi
  done
fi

# ---------------------------------------------------------------- report

echo
if [[ -s $FAILURES ]]; then
  echo "FAILED:"; cat "$FAILURES"; exit 1
fi
echo "all cells match"
