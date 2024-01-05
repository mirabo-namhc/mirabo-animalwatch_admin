const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

module.exports = {
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  parserOptions: {
    project,
  },
  rules: {
    // increase the severity of rules so they are auto-fixable
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'prettier/prettier': ['error'],
    'react/no-array-index-key': 'error',
    'react/destructuring-assignment': 'off', // Vscode doesn't support automatically destructuring, it's a pain to add a new variable
    'react/require-default-props': 'off', // Allow non-defined react props as undefined
    'react/jsx-props-no-spreading': 'off', // _app.tsx uses spread operator and also, react-hook-form
    'react-hooks/exhaustive-deps': 'off', // Incorrectly report needed dependency with Next.js router
    '@next/next/no-img-element': 'off', // We currently not using next/image because it isn't supported with SSG mode
    '@next/next/link-passhref': 'off', // Only needed when the child of Link wraps an <a> tag
    '@typescript-eslint/comma-dangle': 'off', // Avoid conflict rule between Eslint and Prettier
    '@typescript-eslint/consistent-type-imports': 'error', // Ensure `import type` is used when it's necessary
    'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'], // Overrides Airbnb configuration and enable no-restricted-syntax
    'import/prefer-default-export': 'off', // Named export is easier to refactor automatically
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: { project },
    },
  },
  overrides: [
    // override "simple-import-sort" config
    {
      files: ['src/**/*.{js,jsx,ts,tsx}'],
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              // Packages `react` related packages come first.
              ['^react', '^@?\\w'],
              // Internal packages.
              ['^(@|components)(/.*|$)'],
              // Side effect imports.
              ['^\\u0000'],
              // Parent imports. Put `..` last.
              ['^~.', '^\\.\\.(?!/?$)', '^\\.\\./?$'],
              // Other relative imports. Put same-folder imports and `.` last.
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
              // Style imports.
              ['^.+\\.?(css)$'],
            ],
          },
        ],
      },
    },
  ],
  ignorePatterns: ['**/*.config*', '.eslintrc.cjs'],
};
