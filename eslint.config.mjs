// eslint.config.js
import { FlatCompat } from "@eslint/eslintrc"
import simpleImportSort from "eslint-plugin-simple-import-sort"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import reactNative from "eslint-plugin-react-native"
import tseslint from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import { dirname } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  {
    ignores: [
      "node_modules",
      "android/",
      "ios/",
      "build/",
      "dist/",
      ".turbo/",
      ".vscode/",
      "coverage/",
    ],
  },

  // Configurações base recomendadas
  ...compat.extends(
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react-native/all",
    "prettier"
  ),

  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2022,
        sourceType: "module",
      },
    },
    plugins: {
      "react": react,
      "react-hooks": reactHooks,
      "react-native": reactNative,
      "@typescript-eslint": tseslint,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      // React
      "react/react-in-jsx-scope": "off", // Não é necessário no RN
      "react/prop-types": "off", // Usando TS
      "react-native/no-inline-styles": "warn",
      "react-native/no-unused-styles": "error",
      "react-native/split-platform-components": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Imports
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      // TypeScript
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: true,
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      // Estilo
      "no-console": "error",
      semi: ["error", "never"],
      quotes: ["error", "double"],
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "import", next: "*" },
        { blankLine: "always", prev: "*", next: "export" },
        { blankLine: "always", prev: "const", next: "export" },
        { blankLine: "any", prev: "import", next: "import" },
      ],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
]

export default eslintConfig
