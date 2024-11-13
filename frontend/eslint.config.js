// .eslintrc.js
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default {
  parser: tsParser, // TypeScript parser for ESLint
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    js.configs.recommended,
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  plugins: {
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
  },
  overrides: [
    {
      files: ["**/*.{ts,tsx}"],
      rules: {
        ...reactHooks.configs.recommended.rules,
        "react-refresh/only-export-components": [
          "warn",
          { allowConstantExport: true },
        ],
      },
    },
  ],
  globals: {
    ...globals.browser,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    // ESLint + TypeScript Rules
    "@typescript-eslint/no-unused-vars": ["warn"],
    "no-console": "warn",
    // React Hooks Rules
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    // React Refresh Rules
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
  ignorePatterns: ["dist/", "node_modules/"],
};
