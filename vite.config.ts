import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/api/newsapi': {
        target: 'https://newsapi.org/v2',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/newsapi/, ''),
      },
      '/api/guardian': {
        target: 'https://content.guardianapis.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/guardian/, ''),
      },
      '/api/nyt': {
        target: 'https://api.nytimes.com/svc/search/v2',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/nyt/, ''),
      },
    },
  },
});
