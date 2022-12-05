import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      name: 'frc-web-components',
      entry: 'src/index.ts',
      formats: ['es'],
    },
  },
  server: {
    open: '/',
  },
});
