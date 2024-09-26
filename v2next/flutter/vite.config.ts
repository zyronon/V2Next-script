import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        name: 'V2EX - Flutter',
        icon: 'https://www.google.com/s2/favicons?sz=64&domain=v2ex.com',
        match: [
          'https://*.v2ex.com/*',
        ],
        namespace: 'npm/vite-plugin-monkey',
        description: 'flutter专用js',
        author: 'zyronon',
      },
    }),
  ],
});
