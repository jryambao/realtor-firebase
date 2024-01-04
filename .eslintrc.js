module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "google",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
    "plugin:prettier/recommended",
    "prettier",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },

  plugins: ["react"],
  rules: {
    "require-jsdoc": "off",
    "react/react-in-jsx-scope": "off",
    "no-unused-vars": 0,
  },
};
