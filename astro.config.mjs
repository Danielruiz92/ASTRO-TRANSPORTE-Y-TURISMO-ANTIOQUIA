// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.transporteyturismoantioquia.com',
  output: 'server',

  build: {
    inlineStylesheets: 'always',
  },

  integrations: [react(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },

  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },

  server: {
    allowedHosts: ['transporte.rv24.ovh', 'transporteyturismoantioquia.com', 'www.transporteyturismoantioquia.com', 'localhost'],
  },

  adapter: node({
    mode: 'standalone',
  }),
});