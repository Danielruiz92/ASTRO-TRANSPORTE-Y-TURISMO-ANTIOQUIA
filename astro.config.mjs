// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.transporteyturismoantioquia.com',
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    allowedHosts: ['transporte.rv24.ovh', 'transporteyturismoantioquia.com', 'www.transporteyturismoantioquia.com', 'localhost'],
  },
});