/** @type {import('eslint/lib/shared/types').ConfigData} */
const config = {
  ignorePatterns: [
    '.github',
    '.eslintrc.js',
    '.eslintrc.cjs',
    '.yalc',
    '.yarn',
    '.cache',
    '.storybook/*',
    'build',
    'dist',
    'node_modules',
    '*.mjs',
    'next.config.js',
    'tailwind-config.ts',
    'tailwind.config.js',
    'postcss.config.js',
    '*.d.ts',
  ],

  extends: ['eslint:recommended'],

  plugins: ['simple-import-sort', 'import'],

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },

  env: {
    browser: true,
    es6: true,
  },

  settings: {
    tailwindcss: {
      callees: ['tw', 'tx'],
      classRegex: '^(tw|twInactive|twActive)$',
      config: require.resolve('@supastack/ui-styles/default-tailwind-config'),
    },
  },

  rules: {
    'sort-imports': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/extensions': ['error', 'ignorePackages'],
    'no-return-await': 'error',
  },

  overrides: [
    // Typescript
    {
      files: ['**/*.{ts,tsx}'],
      plugins: ['@typescript-eslint'],
      parser: '@typescript-eslint/parser',
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/stylistic-type-checked',
        'prettier',
      ],
      rules: {
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/ban-types': [
          'error',
          {
            extendDefaults: true,
            types: {
              // un-ban a type that's banned by default
              Function: false,
              '{}': false,
            },
          },
        ],
      },
    },

    // Markdown
    {
      files: ['**/*.md'],
      plugins: ['markdown'],
      extends: ['plugin:markdown/recommended', 'prettier'],
    },

    // Jest/Vitest
    {
      files: ['**/*.(test|spec).{js,jsx,ts,tsx}'],
      plugins: ['vitest'],
      extends: ['plugin:vitest/recommended', 'prettier'],
    },
  ],
};

module.exports = config;
