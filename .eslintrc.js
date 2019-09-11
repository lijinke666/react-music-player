module.exports = {
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  parser: 'babel-eslint',
  plugins: ['babel', 'react'],
  extends: 'eslint:recommended',
  env: {
    es6: true,
    browser: true,
    commonjs: true
  },
  globals: {
    __dirname: true,
    process: true,
    jest: true
  },
  rules: {
    'object-shorthand': 'error',
    'generator-star-spacing': ['error', 'after'],
    camelcase: ['error', { properties: 'never' }],
    eqeqeq: ['error', 'smart'],
    'linebreak-style': ['error', 'unix'],
    'new-cap': 'error',
    'no-array-constructor': 'error',
    'no-lonely-if': 'error',
    'no-loop-func': 'error',
    'no-param-reassign': 'error',
    'no-sequences': 'error',
    'no-shadow-restricted-names': 'error',
    'no-unneeded-ternary': 'error',
    //   "no-unused-expressions": "error",
    'no-unused-vars': ['error', { args: 'none' }],
    'no-use-before-define': ['error', 'nofunc'],
    'no-var': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'wrap-iife': ['error', 'inside'],
    yoda: ['error', 'never'],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/jsx-no-undef': ['error', { allowGlobals: true }],
    'react/jsx-no-bind': ['error', { allowArrowFunctions: true }],
    'react/jsx-key': 'error',
    'react/no-unknown-property': 'error',
    'react/no-string-refs': 'error',
    'react/no-direct-mutation-state': 'error'
  }
}
