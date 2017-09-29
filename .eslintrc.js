module.exports = {
  'extends': 'google',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
  },
  'env': {
    'es6': true,
  },
  'rules': {
    'require-jsdoc': 0,
    'react/jsx-uses-vars': 2,
    'react/jsx-uses-react': 2,
  },
  'plugins': [
    'react',
  ],
  'overrides': [
    {
      'files': ['src/client/**/*.js'],
      'parserOptions': {
        'sourceType': 'module',
      },
      'env': {
        'browser': true,
      },
    },
    {
      'files': [
        'webpack.*.js',
        '.eslintrc.js',
        'test/**/*.test.js',
        'src/server/**/*.js',
      ],
      'env': {
        'node': true,
      },
    },
  ],
};
