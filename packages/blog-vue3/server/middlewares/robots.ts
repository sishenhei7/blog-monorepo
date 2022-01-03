import * as fs from 'fs'
import { Context, Next } from 'koa'
import { resolve, resolveCwd, isProd } from '~/server/utils'

export default function robotsMiddleware() {
  const file = fs.readFileSync(
    isProd
      ? resolveCwd('public/robots.txt')
      : resolve('../../public/robots.txt')
  )

  return async (ctx: Context, next: Next) => {
    if (ctx.url === '/robots.txt') {
      ctx.type = 'text/plain; charset=UTF-8'
      ctx.body = file
      ctx.set('Cache-Control', 'max-age=120')
      ctx.status = 200
      return
    }
    await next()
  }
}
