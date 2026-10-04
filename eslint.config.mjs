import coreWebVitals from 'eslint-config-next/core-web-vitals';
import typescript from 'eslint-config-next/typescript';

const eslintConfig = [
  // `.agents` and `.claude` hold vendored skill packs and scratch worktrees —
  // other people's code, and 52k findings that drown the project's own.
  {
    ignores: [
      '.next/**',
      'next-env.d.ts',
      '.agents/**',
      '.claude/**',
    ],
  },
  ...coreWebVitals,
  ...typescript,
  {
    // Next 16's react-hooks preset flags the intentional client-mount pattern
    // (the next-themes `mounted` flag) as set-state-in-effect.
    rules: { 'react-hooks/set-state-in-effect': 'off' },
  },
];

export default eslintConfig;
