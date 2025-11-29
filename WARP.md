# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project overview

This is an Astro 5 project using Tailwind CSS v4 (via the `@tailwindcss/vite` plugin) and TypeScript tooling. The current app is a simple marketing-style site with:

- `src/layouts/Layout.astro` – single HTML shell that imports global styles and wraps all pages.
- `src/pages/index.astro` – landing page using Tailwind utility classes for layout and buttons.
- `src/pages/blog.astro` – empty stub for a future blog route.
- `src/styles/global.css` – imports Tailwind; all styling is expected to be done via Tailwind classes.

The project is set up for future use of `@sensinum/astro-strapi-loader` and content collections, but there is no Strapi integration code yet.

## Commands & tooling

All commands are run from the project root.

### Core lifecycle

- Install dependencies: `npm install`
- Start dev server (default at `http://localhost:4321`): `npm run dev`
- Production build to `./dist`: `npm run build`
- Preview the production build locally: `npm run preview`

### Astro CLI

- General Astro CLI access: `npm run astro -- <subcommand>`
  - Examples: `npm run astro -- check`, `npm run astro -- add tailwind`

### Linting & formatting

- Lint the project (ESLint): `npm run lint`
- Auto-fix lint issues: `npm run lint:fix`
- Format all files with Prettier: `npm run format`
- Check formatting without writing changes: `npm run format:check`

The repo uses Husky + lint-staged to automatically run Prettier and ESLint on staged files before commits.

### Tests

- There is currently **no test script configured** in `package.json`. If you add a test runner, prefer wiring it through an `npm test` (or similar) script and documenting it here.

## Architecture & structure

### Routing & pages

- Astro’s file-based routing is used under `src/pages`.
  - `index.astro` defines the homepage.
  - `blog.astro` is present but empty; it will become `/blog` once implemented.
- Pages import the shared layout from `src/layouts/Layout.astro` and are responsible for composing higher-level sections/components rather than implementing all UI inline.

### Layout

- `src/layouts/Layout.astro` is the single top-level layout.
  - Imports `../styles/global.css`, which in turn imports Tailwind.
  - Defines the `<html>` and `<head>` elements, favicon, viewport, and a `<body>` containing a `<slot />` for page content.
  - Includes a small `<style>` block to normalize `html, body` sizing.

### Styling

- Tailwind CSS v4 is configured via `astro.config.mjs` using `@tailwindcss/vite`.
- `src/styles/global.css` simply imports Tailwind; styling should be applied via Tailwind classes in `.astro` files.
- Typography for rich text/Markdown should use the `prose` class from `@tailwindcss/typography` when such content is added.

### Tooling & configs

- `astro.config.mjs` – Astro configuration with Vite plugin registration for Tailwind.
- `eslint.config.mjs` – ESLint configuration for Astro + TypeScript + Prettier integration.
- `tsconfig.json` – TypeScript configuration for the project.
- Husky hooks in `.husky/` and `lint-staged` configuration in `package.json` enforce formatting and linting on commit.

## Project-specific rules & conventions

This project includes editing rules in `.trae/rules/project_rules.md` and `kilocode/rules/reglas.md`. When making changes in Warp, align with these conventions:

### Source-of-truth & dependencies

- Treat `package.json` as the source of truth for framework and tooling versions.
- **Do not add, remove, or update dependencies** unless explicitly requested by the maintainer.

### UI structure (atomic/section-based design)

- Pages should primarily **compose sections/components** rather than implementing complex UI inline.
  - Use a hierarchy of sections → composite components → smaller "atoms".
  - Before creating a new component, prefer reusing/extending existing ones.
- Creation of entirely new low-level "atom" components should be done only when clearly needed; extend via props/variants when possible.

### Data & content

- Dynamic content should be modeled through Astro content collections or Strapi collections (via `astro-strapi-loader`) rather than hardcoding, except for trivially static labels (e.g. a fixed button label).

### Styling rules

- Prefer **global Tailwind design tokens** (e.g. semantic classes such as `text-primary`, `bg-base-100`, etc.) over raw hex values or ad-hoc local styles.
- Avoid introducing custom inline styles when a Tailwind class can express the same styling.
- For Markdown or rich-text content, use `prose` from the typography plugin for consistent typography.

### TypeScript & props

- When introducing TypeScript-based components (e.g. `.tsx` or complex scripts), define an explicit `interface Props` for component props.
- Avoid using `any`; prefer precise types or `unknown` with proper narrowing.
- For UI-heavy components, aim for a clear props API (e.g. `variant`, `size`, `state`) instead of many loosely defined booleans.

### Cleanup & quality gates

- When removing or refactoring components, also remove unused imports and dead code paths.
- Run `npm run lint` (and fix issues) after non-trivial changes.
- Expect that Husky pre-commit hooks will run Prettier and ESLint via lint-staged on staged files.

### PR-level expectations (for human collaborators)

While Warp does not manage PR descriptions directly, be aware that contributors are expected to:

- Include a version matrix copied from `package.json`.
- Document any framework/library research performed (especially around Astro, Tailwind, and `astro-strapi-loader`).
- Confirm adherence to the layout/atomic design, collections-based data sourcing, Tailwind token usage, typed props, and lint cleanliness.
- Provide UI screenshots or GIFs for visual changes (desktop and mobile).
