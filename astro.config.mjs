// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://aipixeltest.com',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'ja', 'fr', 'de', 'pt', 'ko', 'it'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/500'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          es: 'es',
          ja: 'ja',
          fr: 'fr',
          de: 'de',
          pt: 'pt',
          ko: 'ko',
          it: 'it',
        },
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: cloudflare(),
});
