/** @type {import('eslint/lib/shared/types').ConfigData} */
const config = {
  root: true,

  extends: [
    '@supastack/eslint-config/base',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],

  rules: {
    'react/prop-types': 'off',
    'react/no-unknown-property': [
      2,
      {
        ignore: ['jsx', 'global'],
      },
    ],
  },
};

module.exports = config;
