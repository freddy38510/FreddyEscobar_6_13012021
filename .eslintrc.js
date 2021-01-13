module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'plugin:security/recommended',
  ],
  plugins: ['security'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-console': 'error',
    'func-names': 'off',
    'no-underscore-dangle': 'off',
    'consistent-return': 'off',
    'security/detect-object-injection': 'off',
  },
};
