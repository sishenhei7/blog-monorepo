import { Context, Next } from 'koa'
import HttpProxy from 'http-proxy'
import { logger } from '~/server/utils'
import config, { ProxyOptions } from '~/server/config'

const proxyOptions = config?.server?.proxy || {}

export default function proxyMiddleware() {
  const proxies: Record<string, [HttpProxy, ProxyOptions]> = {}

  Object.keys(proxyOptions).forEach((context) => {
    let opts = proxyOptions[context]
    if (typeof opts === 'string') {
      opts = { target: opts, changeOrigin: true }
    }

    const proxy = HttpProxy.createProxyServer(opts)
    proxy.on('error', (err) => {
      logger.error(err.stack)
    })

    if (opts.configure) {
      opts.configure(proxy, opts)
    }

    proxies[context] = [proxy, { ...opts }]
  })

  return (ctx: Context, next: Next) =>
    new Promise((resolve, reject) => {
      const context = Object.keys(proxies).find((context) =>
        doesProxyContextMatchUrl(context, ctx.url)
      )

      if (context) {
        const { req, res } = ctx
        const [proxy, opts] = proxies[context]

        if (opts.rewrite) {
          ctx.url = opts.rewrite(ctx.url)
        }

        // Let the promise be solved correctly after the proxy.web.
        // The solution comes from https://github.com/nodejitsu/node-http-proxy/issues/951#issuecomment-179904134
        res.on('finish', () => resolve(1))

        proxy.web(req, res, {}, (err: Error) => {
          if (err) {
            logger.error(err.stack)
            reject(err)
          }
        })
      } else {
        resolve(next())
      }
    })
}

function doesProxyContextMatchUrl(context: string, url: string): boolean {
  return (
    (context.startsWith('^') && new RegExp(context).test(url)) ||
    url.startsWith(context)
  )
}
