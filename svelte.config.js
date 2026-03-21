import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    prerender: {
      handleHttpError: ({ path, message }) => {
        // Ignore 404s for static assets in public/ (favicon, icons, etc.)
        if (path.startsWith('/favicon') || path.startsWith('/icons')) return;
        throw new Error(message);
      },
    },
  },
};
