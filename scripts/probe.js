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
    'background-image',
    'box-shadow',
    'text-shadow',
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

  const out = {};
  for (const frame of document.querySelectorAll('[data-testid]')) {
    // The frame is layout scaffolding; the specimen is what it wraps.
    const el = frame.firstElementChild ?? frame;
    const cs = getComputedStyle(el);
    const styles = {};
    for (const p of PROPS) styles[p] = cs.getPropertyValue(p);
    out[frame.dataset.testid] = styles;
  }
  return out;
})();
