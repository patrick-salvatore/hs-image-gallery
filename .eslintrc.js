module.exports = {
  parser: '@typescript-eslint/parser',
  // extends: [
  //   'plugin:react-hooks',
  //   'eslint:recommended',
  //   'plugin:react/recommended',
  //   'plugin:@typescript-eslint/recommended',
  //   'prettier/@typescript-eslint',
  // ],
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'prettier/@typescript-eslint',
  ],
  env: {
    browser: true,
    jasmine: true,
    jest: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 10, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    jsx: true,
  },
  rules: {
    'prettier/prettier': [2, { singleQuote: true, trailingComma: 'es5' }],
    'arrow-body-style': 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'import/prefer-default-export': [0, { packageDir: '.' }],
    'import/prefer-default-export': [0, { packageDir: '.' }],
    'import/named': 0,
    'no-debugger': 2,
    'no-plusplus': 'off',
    'no-nested-ternary': 'off',
    'no-unused-expressions': [
      2,
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],
    'no-underscore-dangle': 'off',
    'global-require': 'off',
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: false,
          object: false,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    'no-param-reassign': 'off',
    // react
    'react/prop-types': [0],
    // 'react/no-array-index-key': [2],
    '@typescript-eslint/interface-name-prefix': [0],
    '@typescript-eslint/no-explicit-any': [0]
  },
};
