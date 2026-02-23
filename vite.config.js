import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: '/Task-Collaboration-Platform/',
    plugins: [react()],
    define: {
      'process.env.OPENROUTER_API_KEY': JSON.stringify(env.VITE_OPENROUTER_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});

