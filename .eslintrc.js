module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint'
  ],
  root: true,
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
  ],
  "parserOptions": {
    "project": ["./tsconfig.json"]
  },
  rules: {
    // Set indent size to 2 spaces
    'indent': ['error', 2],
  },
  ignorePatterns: [
    '**/node_modules'
  ],
  env: {
    node: true,
    es6: true,
  },
};
