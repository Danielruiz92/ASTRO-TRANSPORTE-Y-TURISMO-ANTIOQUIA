import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  // 1. Ignorar archivos de build y caché
  {
    ignores: ['dist/**', '.astro/**', 'node_modules/**', '.vercel/**', '.netlify/**'],
  },

  // 2. Configuración Base de JS
  js.configs.recommended,

  // 3. Configuración Base de TypeScript (para archivos .ts, .tsx)
  ...tseslint.configs.recommended,

  // 4. Configuración Base de Astro
  ...astro.configs.recommended,

  // 5. OVERRIDE CRÍTICO: Configuración específica para Astro + TypeScript
  {
    files: ['**/*.astro'],
    languageOptions: {
      // Usar el parser de Astro para la estructura del archivo
      parser: astro.parser, 
      parserOptions: {
        // Usar el parser de TS para el contenido del script (frontmatter)
        parser: tseslint.parser,
        extraFileExtensions: ['.astro'],
        sourceType: 'module',
      },
    },
  },

  // 6. Prettier (siempre al final para desactivar reglas de formato conflictivas)
  eslintConfigPrettier,
];
