import { ServerConfig } from '~/types/config.server'

const config: ServerConfig = {
  redis: {
    url: 'redis://localhost:6379'
  },
  server: {
    proxy: {
      '/proxy-ping': 'http://localhost:9000/_ping',
      '/proxy_ping': {
        target: 'http://localhost:9000/_ping',
        ignorePath: true
      },
      '^/proxy/.*': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy/, '')
        // configure: (proxy, options) => {
        //   // proxy 是 'http-proxy' 的实例
        // }
      }
    }
  }
}

export default config
