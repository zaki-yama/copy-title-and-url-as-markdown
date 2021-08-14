module.exports = {
  extends: [
    "plugin:react/recommended",
    "@cybozu/eslint-config/presets/react-typescript-prettier",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "no-template-curly-in-string": 0,
  },
};
