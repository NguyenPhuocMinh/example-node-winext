module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    'for-direction': 'error',
    'no-await-in-loop': 'error',
    'no-compare-neg-zero': 'error',
    semi: [
      'error',
      'always'
    ],
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never',
      asyncArrow: 'always'
    }
    ],
    quotes: [
      'error',
      'single', {
        allowTemplateLiterals: true
      }
    ],
    'eol-last': ['error'],
    'no-extra-semi': 'error',
    'linebreak-style': [
      'error',
      'unix'
    ],
    'getter-return': [
      'error',
      {
        allowImplicit: true
      }
    ]
  }
};
