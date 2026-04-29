// Node Imports
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// ESLint Configuration
import { FlatCompat } from '@eslint/eslintrc';
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import js from '@eslint/js';
import globals from 'globals';
import _import from 'eslint-plugin-import';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

// Config
import { type Config, defineConfig } from 'eslint/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const config: Config[] = defineConfig([
  {
    extends: fixupConfigRules(
      compat.extends('eslint:recommended', 'plugin:import/errors', 'prettier')
    ),

    plugins: {
      import: fixupPluginRules(_import),
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      ecmaVersion: 'latest',
      sourceType: 'module',
    },

    rules: {
      'no-unused-vars': [1, { argsIgnorePattern: '^_' }],
      'arrow-body-style': [2, 'as-needed'],
      'no-param-reassign': [2, { props: false }],
      'no-console': 1,
      'no-shadow': [2, { hoist: 'all' }],
      'import/extensions': 0,
    },
  },
  {
    files: ['eslint.config.ts', 'vite.config.ts', 'playwright.config.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin as any,
      import: fixupPluginRules(_import),
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 0,
      'import/no-unresolved': 0,
      'import/named': 0,
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['eslint.config.ts', 'vite.config.ts', 'playwright.config.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin as any,
      import: fixupPluginRules(_import),
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': [1, { argsIgnorePattern: '^_' }],
      'no-console': 1,
      'import/extensions': 0,
    },
  },
  {
    files: ['src/scripts/**'],
    rules: {
      'import/no-unresolved': 0,
      'import/extensions': 0,
    },
  },
]);

export default config;
