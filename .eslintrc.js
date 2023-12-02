module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/stylistic',
  ],
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