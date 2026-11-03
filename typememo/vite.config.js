import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const isPagesBuild = mode === 'pages';

  return {
    base: isPagesBuild ? '/web_test.github.io/typememo/site/' : '/',
    plugins: [react()],
    build: isPagesBuild ? { outDir: 'site' } : undefined,
  };
});