import { FlatCompat } from "@eslint/eslintrc";
import globals from "globals";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});

export default [
  {
    ignores: ["**/dist/**", "**/node_modules/**"],
  },
  ...compat.extends("airbnb-base"),
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
        },
      ],
      // Desactivamos esta regla para evitar conflictos con rutas de CSS y Vite
      "import/no-unresolved": "off",
    },
  },
  ...compat.extends("prettier"),
];