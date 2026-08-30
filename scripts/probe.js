/**
 * In-page style probe for the migration harness. Fed to `agent-browser eval`.
 *
 * Returns { "<data-testid>": { "<property>": "<computed value>" } } for every
 * specimen on /kitchen-sink, reading the specimen's inner element (the actual
 * button/badge/link) rather than the `Spec` frame around it.
 *
 * Only standard properties are read, never custom properties: `--btn-bg` and
 * friends legitimately cease to exist during the migration, while
 * `background-color` must not change. Resolved values are what the contract is
 * written against.
 *
 * This is the colour oracle. daisyUI's :hover, :active and :focus-visible are
 * pure `color-mix()` shifts of a few sRGB steps — far below any workable pixel
 * threshold — so a screenshot cannot police them and this can.
 */
(() => {
  const PROPS = [
    // box
    'display',
    'box-sizing',
    'width',
    'height',
    'padding-top',
    'padding-right',
    'padding-bottom',
    'padding-left',
    'border-top-width',
    'border-right-width',
    'border-bottom-width',
    'border-left-width',
    'border-top-style',
    'border-top-color',
    'border-right-color',
    'border-bottom-color',
    'border-left-color',
    'border-top-left-radius',
    'border-top-right-radius',
    'border-bottom-right-radius',
    'border-bottom-left-radius',
    // paint
    'color',
    'background-color',
    // background-image, box-shadow and text-shadow are deliberately absent.
    // This theme runs at --depth: 0 and --noise: 0, so daisyUI's shadows are
    // fully transparent and its noise layer is sized to zero — the values
    // differ textually while rendering nothing. The pixel oracle covers the
    // day one of them becomes visible.
    'opacity',
    'outline-width',
    'outline-style',
    'outline-color',
    'outline-offset',
    // type
    'font-family',
    'font-size',
    'font-weight',
    'line-height',
    'letter-spacing',
    'text-transform',
    'text-decoration-line',
    'text-decoration-color',
    'white-space',
    // layout
    'align-items',
    'justify-content',
    'column-gap',
    'row-gap',
    'flex-direction',
    'flex-shrink',
    'flex-wrap',
    'position',
    'vertical-align',
    'aspect-ratio',
    // motion + affordance
    'transition-property',
    'transition-duration',
    'transition-timing-function',
    'transform',
    'rotate',
    'cursor',
    'user-select',
    'touch-action',
  ];

  // Properties whose value is a bare colour. Canonicalised below.
const COLOR_PROPS = new Set([
  'color',
  'background-color',
  'border-top-color',
  'border-right-color',
  'border-bottom-color',
  'border-left-color',
  'outline-color',
  'text-decoration-color',
]);

/*
 * The same colour serialises differently depending on where it came from:
 * a direct `var()` reads back as `lab(97.68 …)`, the identical colour through
 * `color-mix()` reads back as `oklab(0.979998 …)`. Comparing those as strings
 * would flag every ported colour as drift.
 *
 * So let the browser resolve it: paint into a 1x1 canvas and read the pixel.
 * That yields 8-bit sRGB — which is not a lossy shortcut but exactly the
 * precision the screen renders at.
 */
const canvas = document.createElement('canvas');
canvas.width = canvas.height = 1;
const ctx = canvas.getContext('2d', { willReadFrequently: true });

function canonColor(value) {
  ctx.clearRect(0, 0, 1, 1);
  ctx.fillStyle = '#000';
  ctx.fillStyle = value; // an unparseable value leaves the previous fillStyle
  ctx.clearRect(0, 0, 1, 1);
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
  return `rgba(${r}, ${g}, ${b}, ${(a / 255).toFixed(3)})`;
}

const out = {};
  for (const frame of document.querySelectorAll('[data-testid]')) {
    // The frame is layout scaffolding; the specimen is what it wraps.
    const el = frame.firstElementChild ?? frame;
    const cs = getComputedStyle(el);
    const styles = {};
    for (const p of PROPS) {
    const v = cs.getPropertyValue(p);
    styles[p] = COLOR_PROPS.has(p) ? canonColor(v) : v;
  }
    out[frame.dataset.testid] = styles;
  }
  return out;
})();
