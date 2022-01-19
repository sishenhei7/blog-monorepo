import path from 'path'
import { defineConfig } from 'vite'
import { plugins } from './build'

// https://vitejs.dev/config/
export default defineConfig((env) => ({
  base: env.command === 'serve' ? '' : '/app/client/',
  resolve: {
    alias: {
      '~': path.resolve(__dirname, '.'),
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: process.env.baseUrl,
        changeOrigin: true,
        rewrite: (path) => ''
      }
    }
  },
  build: {
    target: 'esnext'
  },
  plugins
}))
