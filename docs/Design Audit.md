---
tags: [project/portfolio, type/audit]
updated: 2026-07-26
---

# Design Audit — daisyUI 5

Part of [[Overview]]. Audit only — **no code changed**. Proposals below are
ordered by impact.

## Method

Context7 MCP was not connected in this session, so the reference used was the
daisyUI 5 documentation vendored in this repo at `.agents/skills/daisyui/`
(`SKILL.md` reports version 5.6.x, matching the installed 5.6.18) — the
`colors`, `config`, `usage`, and `components/` guides. Findings were then
measured against the running site in the browser rather than inferred.

## What is already right — do not change

The site has a coherent, non-generic identity. Everything here is
**hand-written Tailwind, not daisyUI**, and none of it should be touched:

- The `.blueprint` graph-paper backdrop and its fade mask
- Hairline `border-base-content/15` rules
- Mono uppercase eyebrows with `tracking-[0.18em]`
- The GitHub-linguist colour dots from `languages.ts`

**Vertical rhythm is consistent and should be preserved:** every home section is
`py-14` (56px top and bottom); only the hero differs at 96/112px. That is a
deliberate scale, not drift.

`status status-success` on the "Available for hire" dot is a correct, idiomatic
use of a daisyUI component.

---

## F1 — `primary` is doing six different jobs

**Severity: high.** This is the biggest single design problem.

Measured on the home page: **20 elements carry a `primary` class.**

| Use                                         | Count |
| ------------------------------------------- | ----- |
| `btn-primary` (skip link, Résumé, Email me) | 3     |
| `badge-primary` (topic tags)                | 8     |
| `text-primary` (work card titles)           | 3     |
| `group-hover:text-primary` (press links)    | 4     |
| `border-primary` (pull quote)               | 1     |
| `link-primary` ("See the paper")            | 1     |

daisyUI's own colour rule 10 states: _"Use `base-*` colors for majority of the
page. Use the default variant for all elements. **Use `primary` color once only,
for the most important element on the page.**"_ Usage rule 12 adds: _"Always use
the default variant … do not use `btn btn-primary`, prefer `btn`."_

The consequence is not theoretical. The Résumé button — plausibly the most
important element on a job-seeking portfolio — currently competes for attention
with eight topic tags on the same screen. When everything is emphasised,
nothing is.

**Proposal.** Reserve `primary` for calls to action only:

- **Keep** `btn-primary` on Résumé and Email me. Consider demoting one of the
  two so a single element leads.
- **Topic badges** → `badge-ghost` or `badge-outline`. They are metadata, not
  actions.
- **Work card titles** → `text-base-content` with `group-hover:underline`.
  Position, weight, and the kind icon already mark them as titles; colour is
  redundant.
- **Pull-quote border** → `border-base-content/20`.
- **Press hover** → underline rather than colour shift.
- **Detail-page action buttons** → plain `btn`, with `btn-primary` on at most
  the single most likely action (Read PDF for research, Open demo for projects).

Net effect: roughly 20 primary usages down to 2–4, with the accent recovering
its meaning. **This is the highest-value change in the audit and costs no
layout work.**

---

## F2 — Line length runs to ~122 characters

**Severity: high.**

Measured on `/work` and the home Recent Work list:

|                             |                            |
| --------------------------- | -------------------------- |
| Card width                  | 976 px                     |
| Description width           | 976 px (`max-width: none`) |
| Approx. characters per line | **~122**                   |
| Research author line        | ~122                       |
| Venue line (12 px)          | **~163**                   |

Typographic guidance puts a comfortable measure at 45–75 characters; even
generous limits stop near 90. Nothing in `WorkCard` constrains text width, so
descriptions span the full 1024 px container. Detail pages are fine — they are
already `max-w-3xl`.

**Proposal.** Cap the text column inside the card while leaving the row, its
divider, and the right-aligned status badge full-width:

- Description, author, and venue lines → `max-w-[68ch]` (or `max-w-2xl`)
- Title → `max-w-[46ch]` so long research titles wrap deliberately rather than
  running under the status badge

This changes no spacing and no colour — only where lines break.

---

## F3 — The theme is a patch, not a theme

**Severity: medium.**

`globals.css` enables the built-in themes and then overrides one from outside:

```css
@plugin "daisyui" {
  themes:
    light --default,
    dark --prefersdark;
}

[data-theme='dark'] {
  --color-primary: oklch(70% 0.15 277);
  --color-primary-content: oklch(20% 0.02 277);
}
```

daisyUI 5 sanctions `@plugin "daisyui/theme" { … }` for exactly this, with the
full variable set declared in one place. The current form works, but the
contrast fix survives only by winning a specificity race against the plugin
output.

Two further consequences:

1. **Three theme knobs are never set.** `--size-field`, `--size-selector`, and
   `--border` control component density and border weight globally. The site's
   hairline aesthetic is currently expressed by repeating
   `border-base-content/15` in markup; `--border` would make it a theme
   property. Note the `--radius-*` values _are_ already customised, so half of
   this surface is in use and half is not.
2. The fix applies to `primary` only. The tab-contrast fix from the same class
   of problem lives inline in `WorkList.tsx` instead — same bug, two mechanisms,
   and the component-level one protects nothing else.

**Proposal.** Promote both themes to named `@plugin "daisyui/theme"` blocks
carrying the contrast decisions, then delete the `[data-theme='dark']` patch and
move the tab colour override out of `WorkList.tsx` into the theme layer.

**Prerequisite for anything here:** three documents (`CLAUDE.md`,
`docs/Architecture.md`, `docs/Overview.md`) claim the themes are `emerald` and
`dracula`. They are the built-in `light` and `dark`. Fix the record first.

---

## F4 — Hand-rolled patterns daisyUI already provides

**Severity: low–medium.** Adopt selectively; the discovery protocol in
`.agents/skills/daisyui/SKILL.md` asks for candidates to be compared, so each
is listed with a recommendation rather than a blanket "use it".

| Candidate           | Where                     | Verdict                                                                                                                                                                                                  |
| ------------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `list` / `list-row` | `/work` rows, Recent Work | **Recommended.** Purpose-built for exactly this layout, and would replace the hand-rolled `divide-y` + `article` structure                                                                               |
| `timeline`          | About page bands          | **Worth prototyping.** Origin → Engineering → Research → today is genuinely chronological, so the device would encode something true rather than decorate. `timeline-compact` suits a single-column read |
| `divider`           | Section separators        | Optional. Current hairlines are already correct and more restrained                                                                                                                                      |
| `avatar`            | Navbar logo               | Optional. `rounded-full object-cover` already does the job in fewer classes                                                                                                                              |
| `breadcrumbs`       | Detail page back-link     | **Not recommended.** One level deep; the "← All work" eyebrow is lighter and matches the mono voice                                                                                                      |
| `filter`            | `/work` kind filter       | **Not recommended — see below**                                                                                                                                                                          |

### On `filter`

daisyUI ships a radio-based `filter` component, and single-select filtering is
arguably a radio group rather than a set of toggle buttons. It is the more
semantically honest match for what `/work` does.

Against it: the current implementation was deliberately built as
`role="group"` + `aria-pressed` after getting tablist semantics wrong once, it
is verified working with keyboard and a live region, and `filter` relies on
uncontrolled radio inputs that would need rework to drive React state.
**Recommendation: leave it.** Revisit only if a second filter dimension (by
tag, by year) appears, at which point `join` is the better grouping primitive.

---

## F5 — Opacity floor is unverified

**Severity: low, but unbounded.**

Text opacity currently spans `/50` `/60` `/70` `/80` over `base-content`.
Measured previously: `/70` is 6.57:1 in light, 19.56:1 in dark. Unmeasured and
plausibly near the 4.5:1 AA floor:

- `error.tsx:23` — `/50` at 12 px
- `WorkCard` meta row — `/60` at 12 px

**Proposal.** Measure both in both themes, then adopt a written convention —
for example, nothing below `/70` under 14 px — so the question is settled once
rather than rediscovered per component.

---

## Suggested order

1. **F1** — largest visual gain, no layout risk, pure class swaps
2. **F2** — one `max-w` per text element, no colour change
3. **F3 docs correction** — the emerald/dracula claim is wrong today
4. **F5** — measure, then write the rule down
5. **F3 theme promotion** — mechanical once the above is settled
6. **F4** — `list` first; prototype `timeline` on About and keep it only if it
   beats the current bands

F1 and F2 together would change how the site reads without touching a single
structural decision.

## Verification

Because these are visual changes, the check is comparative:

1. Screenshot `/`, `/work`, one project, one research page, `/about` at 1280
   and 375, **both themes**, before any change
2. After F1, confirm `primary` usages drop to the intended few:
   `[...document.querySelectorAll('[class*="primary"]')].length`
3. After F2, re-measure characters per line on a work card — target ≤75
4. After F3/F5, re-measure contrast for every `base-content` opacity, per theme,
   resolving the painted background (`body` is transparent and will skew the
   reading)
5. `npx tsc --noEmit`, `npx eslint src`, `npx prettier --check src`,
   `bun run build`
6. Keyboard pass on `/work` — the filter group must keep its focus ring,
   activation, and `aria-live` count
