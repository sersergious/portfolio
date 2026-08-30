#!/usr/bin/env python3
"""Compare two computed-style dumps from scripts/ab.sh.

Exact string equality, no tolerance: these are resolved values, so a 1% drift
in a colour that no pixel threshold can see shows up here as a changed string.

Prints one line per drifted property and exits 1 if anything drifted.
"""

import json
import sys


def main() -> int:
    ref_path, new_path = sys.argv[1], sys.argv[2]
    ref = json.load(open(ref_path))
    new = json.load(open(new_path))

    drift = 0

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
                if va != vb:
                    print(f"  {tid}:{state} {prop}")
                    print(f"      ref {va!r}")
                    print(f"      new {vb!r}")
                    drift += 1

    if drift:
        print(f"  {drift} property drift(s)")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
