// eslint.config.mjs
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import eslintConfigPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // Ignora outputs y dependencias
  {
    ignores: ['dist/**', '.astro/**', 'node_modules/**', '.vercel/**', '.netlify/**'],
  },

  // Reglas recomendadas JS
  js.configs.recommended,

  // Reglas recomendadas TS (sin y con type-checking)
  ...tseslint.configs.recommended, // sintaxis/semántica básicas
  ...tseslint.configs.recommendedTypeChecked, // requiere tsconfig para checks con tipos
  {
    languageOptions: {
      parserOptions: {
        project: true, // autodetecta tsconfig.json
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // ejemplos útiles sin ser estrictos
      '@typescript-eslint/consistent-type-imports': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },

  // Reglas recomendadas para archivos .astro
  ...astro.configs.recommended, // parser + reglas sugeridas
  {
    files: ['**/*.astro'],
    rules: {
      // Puedes endurecer reglas específicas si quieres:
      // 'astro/no-set-html-directive': 'error',
    },
  },

  eslintConfigPrettier,
];
