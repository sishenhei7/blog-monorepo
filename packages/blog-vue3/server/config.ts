import { ServerConfig } from '~/types/config.server'

const config: ServerConfig = {
  redis: {
    url: 'redis://localhost:6379'
  },
  server: {
    proxy: {
      '/proxy_ping': '_ping',
      '^/proxy/.*': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy/, '')
      }
    }
  }
}

export default config
