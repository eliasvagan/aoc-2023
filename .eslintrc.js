module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/strict',
    'plugin:@typescript-eslint/stylistic',
  ],
  ignorePatterns: [
    '**/node_modules',
  ],
  plugins: [
    'sort-keys-fix',
  ],
  rules: {
    'comma-dangle': ['warn', {
      'arrays': 'always-multiline',
      'exports': 'always-multiline',
      'functions': 'always-multiline',
      'imports': 'always-multiline',
      'objects': 'always-multiline',
    }],
    'indent': ['warn', 2],
    'max-len': ['warn', {
      'code': 90,
    }],
    'no-multiple-empty-lines': ['warn', { 
      'max': 1, 
      'maxBOF': 0, 
      'maxEOF': 0, 
    }],
    'object-curly-spacing': ['warn', 'always'],
    'padded-blocks': ['warn', 'never'],
    'quotes': [ 'warn', 'single'],
    'semi': ['warn', 'always'],
    'sort-imports': ['warn', {
      'allowSeparatedGroups': false,
      'ignoreCase': false,
      'ignoreDeclarationSort': false,
      'ignoreMemberSort': false,
      'memberSyntaxSortOrder': ['none', 'all', 'single', 'multiple'],
    }],
    'sort-keys': [
      'warn',
      'asc',
      {
        'caseSensitive': true,
        'minKeys': 2,
        'natural': true,
      },
    ],
    'sort-keys-fix/sort-keys-fix': 'warn',
  },
};