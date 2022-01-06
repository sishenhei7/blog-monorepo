import { v4 as uuidv4 } from 'uuid'
import { Context, Next } from 'koa'
import cache from '~/server/cache'
import { Mmdb } from '~/server/utils/getMmdb'

/* 原则上这里都是在 ctx.state 上加属性的方法 */

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

// test: 67.183.57.64
// subdivision: WA
// country: US
// city: Snohomish
// continent: NA
// postal: 98012
// location.latitude: number
// location.longitude: number
export function parseIpMiddleware(mmdb: Mmdb) {
  return async (ctx: Context, next: Next) => {
    const res = mmdb.get(ctx.ip)
    ctx.state.ipData = {
      country: res?.country?.iso_code,
      continent: res?.continent?.code,
      postal: res?.postal?.code,
      city: res?.city?.names?.en,
      location: res?.location,
      subdivision: res?.subdivisions?.length
        ? res?.subdivisions[0]?.iso_code
        : undefined
    }
    await next()
  }
}
