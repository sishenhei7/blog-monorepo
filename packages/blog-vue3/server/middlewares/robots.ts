import fs from 'fs'
import path from 'path'
import { Context, Next } from 'koa'
import config from '~/server/config'

const robots = fs.readFileSync(path.resolve('data/robots.txt')).toString()
const cacheDuration = config?.cacheControl?.robots || null

export default function robotsMiddleware() {
  return async (ctx: Context, next: Next) => {
    if ('/robots.txt' !== ctx.path) return next()

    if ('GET' !== ctx.method && 'HEAD' !== ctx.method) {
      ctx.status = 'OPTIONS' == ctx.method ? 200 : 405
      ctx.set('Allow', 'GET, HEAD, OPTIONS')
      return
    }

    if (cacheDuration) {
      ctx.set(
        'Cache-Control',
        `max-age=${cacheDuration}, s-maxage=${cacheDuration}, public`
      )
    }

    ctx.type = 'text/plain; charset=UTF-8'
    ctx.body = robots
  }
}
