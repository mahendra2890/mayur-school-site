// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  // TODO: replace with the school's real domain once purchased
  site: 'https://mayur-school-site.pages.dev',

  integrations: [sitemap()],
  adapter: cloudflare(),
});