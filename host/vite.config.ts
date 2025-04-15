import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        // first/App
        first: 'https://whaleback-first.vercel.app/assets/remoteEntry.js',
      },
      shared: {
        react: {
          requiredVersion: '^18.2.0',
        },
        'react-dom': {
          requiredVersion: '^18.2.0',
        },
        'react-router-dom': {
          requiredVersion: '^6.22.2',
        },
      },
    }),
  ],
  envDir: 'env',
  server: {
    port: 5000,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
})
