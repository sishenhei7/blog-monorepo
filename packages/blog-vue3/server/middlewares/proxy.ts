import { Context, Next } from 'koa'
import HttpProxy from 'http-proxy'
import { logger } from '~/server/utils'
import { ProxyOptions, ServerConfigProxyOptions } from '~/types/config.server'

export default function proxyMiddleware(
  options: ServerConfigProxyOptions = {}
) {
  const proxies: Record<string, [HttpProxy, ProxyOptions]> = {}

  Object.keys(options).forEach((context) => {
    let opts = options[context]
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

  return async (ctx: Context, next: Next) => {
    for (const context in proxies) {
      const { req, res } = ctx
      const [proxy, opts] = proxies[context]

      if (opts.rewrite) {
        req.url = opts.rewrite(req.url!)
      }

      // res.on('close', () => {
      //   reject(
      //     new Error(`Http response closed while proxying ${ctx.req.oldPath}`)
      //   )
      // })

      // res.on('finish', () => {
      //   resolve()
      // })

      proxy.web(req, res)
      return
    }

    await next()
  }
}
