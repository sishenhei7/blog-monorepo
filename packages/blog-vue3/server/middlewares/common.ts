import { v4 as uuidv4 } from 'uuid'
import { Context, Next } from 'koa'
import cache from '~/server/cache'
import { Mmdb } from '~/server/utils/getMmdb'
import { countryLanguageMap, CountryKey, isSearchBot } from '~/server/utils'

/* 原则上这里都是在 ctx.state 上加属性的方法 */

export function isStaticOrApiMiddleware() {
  return async (ctx: Context, next: Next) => {
    ctx.state.isStaticOrApi =
      /\.[a-z]{2,4}$|__webpack_hmr/.test(ctx.path) ||
      ctx.path.startsWith('/static') ||
      ctx.path.startsWith('/api') ||
      ctx.get('x-requested-with') === 'XMLHttpRequest'
    await next()
  }
}

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

export function detectDeviceMiddleware() {
  const appRE = /blog\/(\d+\.)+\d+/i
  const iosRE = /iPad|iPhone|iPod/i
  const phoneRE =
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series[46]0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i

  return async (ctx: Context, next: Next) => {
    const ua = ctx.get('user-agent')
    const forcePlatform = ctx.cookies.get('forcePlatform') // 调试用
    const isIOS = iosRE.test(ua)
    const isApp = appRE.test(ua)
    const isPhone = phoneRE.test(ua)
    const isMobile = isIOS || isApp || isPhone
    const platform = forcePlatform || (isMobile ? 'mobile' : 'desktop')

    ctx.state.isIOS = isIOS
    ctx.state.isApp = isApp
    ctx.state.isMobile = isMobile
    ctx.state.platform = platform

    await next()
  }
}

export function detectCountryMiddleware() {
  return async (ctx: Context, next: Next) => {
    ctx.state.country = ctx.state.ipData.country || 'zh-CN'
    await next()
  }
}

export function detectLanguageMiddleware(isAddToUrl = false) {
  const languages = ['en', 'zh-CN']
  const languageRE = new RegExp(`^/${languages.join('|')}/`)

  return async (ctx: Context, next: Next) => {
    let language = 'zh-CN'

    const ipLanguage = countryLanguageMap[ctx.state.country as CountryKey]
    if (ipLanguage && languages.includes(ipLanguage)) {
      language = ipLanguage
    }

    const cookieLanguage = ctx.cookies.get('language')
    if (cookieLanguage && languages.includes(cookieLanguage)) {
      language = cookieLanguage
    }

    ctx.state.language = language

    // 是否把语言加到 url 上，示例：/blog/1 => /zh-CN/blog/1
    if (isAddToUrl && !languageRE.test(ctx.path)) {
      return ctx.redirect(`/${language}/`)
    }

    await next()
  }
}

export function detectFeatureMiddleware() {
  return async (ctx: Context, next: Next) => {
    let isSupportWebp = (ctx.get('accept') || '').includes('image/webp')

    // 对所有的 IOS 不处理, 部分用户出现图片无法打开的情况
    if (/(iPhone|iPad|iPod)/i.test(ctx.get('user-agent'))) {
      isSupportWebp = false
    }

    ctx.state.isSupportWebp = isSupportWebp
    ctx.state.isSearchBot = isSearchBot(ctx.get('user-agent'))
    await next()
  }
}
