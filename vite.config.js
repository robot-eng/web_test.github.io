import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const isPagesBuild = mode === 'pages';

  return {
    base: isPagesBuild ? '/web_test.github.io/kham-khoi-jam/site/' : '/',
    plugins: [react()],
    build: isPagesBuild ? { outDir: 'site' } : undefined,
    server: {
      host: '127.0.0.1',
    },
  };
});