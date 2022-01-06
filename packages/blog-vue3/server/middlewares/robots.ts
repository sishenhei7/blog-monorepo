import fs from 'fs'
import path from 'path'
import { Context, Next } from 'koa'

export default function robotsMiddleware() {
  const file = fs.readFileSync(path.resolve('data/robots.txt'))

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
