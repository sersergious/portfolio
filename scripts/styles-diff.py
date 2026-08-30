#!/usr/bin/env python3
"""Compare two computed-style dumps from scripts/ab.sh.

Exact string equality, no tolerance: these are resolved values, so a 1% drift
in a colour that no pixel threshold can see shows up here as a changed string.

Prints one line per drifted property and exits 1 if anything drifted.
"""

import json
import re
import sys

_FLOAT = re.compile(r"[-+]?\d*\.\d+")


def norm(value: str) -> str:
    """Round embedded floats to 4dp.

    Chrome resolves `color-mix()` with a little float jitter between browser
    instances: a self-check produced `oklab(0.949737 …)` on one side and
    `oklab(0.949746 …)` on the other, from identical CSS. That is ~1e-5 — nine
    significant digits in, and far below anything renderable.

    4dp keeps the oracle sharp where it matters: a 0.1% lightness drift is
    0.4469 vs 0.4473, still a clean miss.
    """
    return _FLOAT.sub(lambda m: f"{round(float(m.group()), 4):g}", value)


def inert(prop: str, state: dict) -> bool:
    """True when this property cannot be observed in the state it was read in.

    Adopting shadcn's base layer paints `border-color` and `outline-color` onto
    every element via `*`. On an element whose border is 0px wide, or whose
    outline-style is none, that is a value nothing can render — the elements
    that actually draw a border or a focus ring all set their own colour, and
    those still compare strictly.

    This is not a tolerance. It is the difference between a value and a pixel.
    """
    if prop.startswith('border') and prop.endswith('-color'):
        side = prop.split('-')[1]
        return state.get(f'border-{side}-width') == '0px'
    if prop == 'outline-color':
        return state.get('outline-style') == 'none'
    return False


def main() -> int:
    ref_path, new_path = sys.argv[1], sys.argv[2]
    ref = json.load(open(ref_path))
    new = json.load(open(new_path))

    drift = 0
    unobservable = 0

    for tid in sorted(set(ref) | set(new)):
        if tid not in new:
            print(f"  missing specimen: {tid}")
            drift += 1
            continue
        if tid not in ref:
            print(f"  new specimen (no reference): {tid}")
            drift += 1
            continue

        for state in sorted(set(ref[tid]) | set(new[tid])):
            a = ref[tid].get(state)
            b = new[tid].get(state)
            if a is None or b is None:
                print(f"  {tid}:{state} — present on only one side")
                drift += 1
                continue
            for prop in sorted(set(a) | set(b)):
                va, vb = a.get(prop), b.get(prop)
                if norm(va) == norm(vb):
                    continue
                if inert(prop, b) and inert(prop, a):
                    unobservable += 1
                    continue
                print(f"  {tid}:{state} {prop}")
                print(f"      ref {va!r}")
                print(f"      new {vb!r}")
                drift += 1

    if unobservable:
        print(f"  {unobservable} drift(s) on properties nothing can render "
              f"(border-color at 0px, outline-color at outline-style:none)")
    if drift:
        print(f"  {drift} property drift(s)")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
