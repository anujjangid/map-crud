module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  env: {
    jest: true
  },
  rules: {
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'no-trailing-whitespace': true,
    'comma-dangle': 0, // not sure why airbnb turned this on. gross!
    indent: 0,
    'object-curly-spacing': 0,
    'no-trailing-spaces': 0,
    'react/prefer-stateless-function': 0,
    'react/prop-types': 0,
    'react/jsx-closing-bracket-location': 0,
    'react/jsx-indent': 0,
    'no-console': 0,
    'prefer-template': 0,
    'max-len': 0,
    'no-underscore-dangle': [2, { allow: ['__data'] }],
    'global-require': 0,
    'no-restricted-syntax': 0,
    'linebreak-style': 0,
    'react/jsx-filename-extension': 0,
    'import/imports-first': 0
  }
};
