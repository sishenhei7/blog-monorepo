import { Context, Next } from 'koa'
import { ViteDevServer } from 'vite'

export default function viteMiddleware(vite: ViteDevServer) {
  return (ctx: Context, next: Next) =>
    new Promise((resolve, reject) => {
      vite.middlewares(ctx.req, ctx.res, (err: Error) => {
        err ? reject(err) : resolve(next())
      })
    })
}
