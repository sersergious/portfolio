import coreWebVitals from 'eslint-config-next/core-web-vitals';
import typescript from 'eslint-config-next/typescript';

const eslintConfig = [
  { ignores: ['.next/**', 'next-env.d.ts'] },
  ...coreWebVitals,
  ...typescript,
  {
    // Next 16's react-hooks preset flags the intentional client-mount pattern
    // (next-themes mounted flag, client-only email decode) as set-state-in-effect.
    rules: { 'react-hooks/set-state-in-effect': 'off' },
  },
];

export default eslintConfig;
