import HttpProxy from 'http-proxy'

export interface ProxyOptions extends HttpProxy.ServerOptions {
  rewrite?: (path: string) => string
  configure?: (proxy: HttpProxy, options: ProxyOptions) => void
}

export type ServerConfigProxyOptions = Record<string, string | ProxyOptions>

export interface ServerConfig {
  readonly redis?: {
    url: string
  }
  readonly server?: {
    isAddLangToUrl?: boolean
    proxy?: ServerConfigProxyOptions
  }
}
