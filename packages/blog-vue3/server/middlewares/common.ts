import { v4 as uuidv4 } from 'uuid'
import { Context, Next } from 'koa'
import cache from '~/server/cache'

export function requestIdMiddleware() {
  return async (ctx: Context, next: Next) => {
    ctx.state.requestId = uuidv4().slice(0, 8)
    await next()
  }
}

export function cacheMiddleware() {
  return async (ctx: Context, next: Next) => {
    ctx.state.cache = cache
    await next()
  }
}
