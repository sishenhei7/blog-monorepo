import { Context, Next } from 'koa'
import { performance } from 'perf_hooks'
import { logger, timeFrom } from '~/server/utils'

export default function timeMiddleware() {
  return async (ctx: Context, next: Next) => {
    const start = performance.now()
    const { bytesWritten = 0 } = ctx.socket

    ctx.res.on('finish', () => {
      const id = ctx.state.requestId
      const url = ctx.url
      const method = ctx.method || 'UNKNOWN'
      const time = timeFrom(start)
      const bytes = bytesWritten
      const status = ctx.status
      logger.log(`${id} ${method} ${url} ${status} ${time} ${bytes}b`)
    })

    await next()
  }
}
