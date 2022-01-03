import { Context, Next } from 'koa'
import { performance } from 'perf_hooks'
import { logger, timeFrom } from '~/server/utils'

export default function timeMiddleware() {
  return async (ctx: Context, next: Next) => {
    const start = performance.now()
    const { bytesWritten = 0 } = ctx.req.socket

    ctx.res.on('finish', () => {
      logger.log(`${ctx.method} ${ctx.url} ${timeFrom(start)} ${bytesWritten}b`)
    })

    await next()
  }
}
