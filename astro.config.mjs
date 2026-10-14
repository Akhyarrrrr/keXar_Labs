import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  site: process.env.PUBLIC_SITE_URL || undefined,
  integrations: [react()],
  vite: { plugins: [tailwind()] },
});
