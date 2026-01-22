// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    allowedHosts: ['transporte.rv24.ovh', 'tranporteyturismoantioquia.com', 'www.tranporteyturismoantioquia.com', 'localhost'],
  },
});
