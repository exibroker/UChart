module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: 'love',
  rules: {
    "@typescript-eslint/no-non-null-assertion": "off",
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/no-unnecessary-type-assertion': 'off'
  },
  parserOptions: {
    "warnOnUnsupportedTypeScriptVersion": false
  }
}
