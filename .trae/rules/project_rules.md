# 📚 Reglas de Edición (Astro + Tailwind + Strapi Loader)

## 0) Antes de tocar código (control de versiones y docs)

1. Verificar versiones en `package.json`. Reportar matriz en el PR (no modificar).
2. Usar **mcp context7** para consultar documentación actualizada antes de planificar cambios.

### Uso de mcp context7 (OBLIGATORIO)

- **Fuentes permitidas**:
  - Astro: astro.build/_, docs.astro.build/_, github.com/withastro/\*
  - Tailwind: tailwindcss.com/docs/_, github.com/tailwindlabs/_
  - Plugins Tailwind: @tailwindcss/\* en GitHub/npm
  - astro-strapi-loader: github.com/VirtusLab-Open-Source/astro-strapi-loader/\*, npmjs.com/package/@sensinum/astro-strapi-loader
- **Consultas tipo**:
  - "Astro changelog <version> site:astro.build"
  - "Install Tailwind with Astro site:docs.astro.build"
  - "astro-strapi-loader README site:github.com"
- **Ventana de frescura**: priorizar ≤ 6 meses.
- **Evidencia en PR** (bloque obligatorio):
  - Matriz de versiones (`package.json`)
  - Consultas realizadas
  - URLs revisadas
  - Conclusión (1–2 líneas sobre validez)

## 1) Páginas y componentes

- Páginas **solo importan secciones**. Nada de UI inline.
- Secciones → compuestos → átomos (arquitectura atómica).
- Antes de crear componente, verificar existencia.
- Nuevos átomos requieren autorización. Variantes se extienden con clases/props.

## 2) Contenido

- Todo lo dinámico se maneja con **collections** (Astro o Strapi).
- Excepción: textos 100% fijos (ej. label "Precio").

## 3) Estilos (Tailwind v4)

- Usar **tokens globales** (`text-primary`, `bg-base-100`, etc.).
- Nada de hex ni estilos locales.
- Tipografía Markdown → clase `prose` (plugin typography).

## 4) Props y TypeScript

- Siempre usar `interface Props`.
- Prohibido `any`.
- Componentes intensivos deben tener API clara (variant, size, state, etc.).

## 5) Limpieza y lint

- Al eliminar componentes, limpiar imports.
- Ejecutar `npm run lint` tras cada cambio. Corregir errores.

## 6) Dependencias

- Prohibido agregar/eliminar/actualizar librerías sin autorización.

## 7) Checklist PR

- [ ] Matriz de versiones copiada de `package.json`
- [ ] Bloque "MCP context7 — Evidencia"
- [ ] Página sin UI inline
- [ ] Componentes reutilizados o autorizados
- [ ] Datos desde collections
- [ ] Estilos con tokens globales
- [ ] Props tipadas en TS
- [ ] Imports huérfanos eliminados
- [ ] Lint sin errores
- [ ] Capturas/gif de UI (desktop + móvil)
