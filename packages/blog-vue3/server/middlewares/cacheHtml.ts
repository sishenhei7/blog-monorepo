import { Context, Next } from 'koa'
import { URL } from 'url'
import { ServerConfig } from '~/types/config.server'
import { logger, isProd } from '~/server/utils'

function getQueryByKey(key: string, query: Context['query'] = {}) {
  const res = query[key]
  return Array.isArray(res) ? res[0] : res
}

function genCacheKey(ctx: Context) {
  try {
    const url = new URL(`${ctx.origin}${ctx.originalUrl}`)
    const query = {
      language: ctx.state.language,
      country: ctx.state.country,
      platform: ctx.state.platform,
      page: getQueryByKey('page', ctx.query) || '1',
      source: getQueryByKey('source', ctx.query) || ''
    } as Record<string, string>

    url.search = new URLSearchParams(query).toString()
    return url.toString()
  } catch (error) {
    logger.error('Can not gen cachekey: ', error)
    return ''
  }
}

export default function cacheHtmlMiddleware(
  pageCache: ServerConfig['pageCache'] = {}
) {
  return async (ctx: Context, next: Next) => {
    const { include = [], exclude = [] } = pageCache
    let cacheKey = null

    // 如果是测试环境或者爬虫则不缓存
    if (!isProd || ctx.state.isSearchBot) {
      return next()
    }

    // 判断缓存范围
    if (include.length > 0) {
      const isInclude = include.some((re) => re.test(ctx.path))
      if (!isInclude) {
        return next()
      }

      const isInExclude = exclude.some((re) => re.test(ctx.path))
      if (isInExclude) {
        return next()
      }

      cacheKey = genCacheKey(ctx)
      const { cache } = ctx.state
      const html = await cache.get(cacheKey)
      if (cacheKey && html) {
        ctx.status = 200
        ctx.response.type = 'text/html; charset=utf-8'
        ctx.body = html
        return
      }
    }

    await next()

    // 如果需要缓存，则存到缓存中
    if (cacheKey) {
      const { cache } = ctx.state
      await cache.set(cacheKey, ctx.body)
    }
  }
}
