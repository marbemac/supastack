module.exports = {
  root: true,
  extends: ['plugin:tailwindcss/recommended', 'plugin:storybook/recommended', '@supastack/eslint-config/react'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
};
