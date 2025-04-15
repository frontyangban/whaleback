import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import path from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      federation({
        name: 'host',
        remotes: {
          // first/App
          first:
            mode === 'production'
              ? env.VITE_APP_REMOTE_FIRST_URL
              : 'localhost:5000/assets/remoteEntry.js',
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
  }
})
