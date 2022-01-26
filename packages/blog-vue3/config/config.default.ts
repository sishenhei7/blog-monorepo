import HttpProxy from 'http-proxy'

export interface ProxyOptions extends HttpProxy.ServerOptions {
  rewrite?: (path: string) => string
  configure?: (proxy: HttpProxy, options: ProxyOptions) => void
}

export interface ServerConfig {
  readonly env: {
    API_URL: string
  }
  readonly redis?: {
    url: string
  }
  readonly server?: {
    isAddLangToUrl?: boolean
    proxy?: Record<string, string | ProxyOptions>
  }
  readonly pageCache?: {
    include?: RegExp[]
    exclude?: RegExp[]
  }
  readonly cacheControl?: {
    static?: number
    robots?: number
  }
}

const config: ServerConfig = {
  env: {
    API_URL: 'localhost:9000'
  },
  redis: {
    url: 'redis://localhost:6379'
  },
  server: {
    isAddLangToUrl: false,
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
  },
  pageCache: {
    include: [/^\/$/],
    exclude: []
  },
  cacheControl: {
    static: 60 * 60 * 24 * 7,
    robots: 60 * 60 * 24
  }
}

export default config
