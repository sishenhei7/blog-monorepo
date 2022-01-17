import createApp from '@/main'
import { Context } from 'koa'
import { renderToString, SSRContext } from 'vue/server-renderer'
import { setup } from '@css-render/vue3-ssr'
import useContextStore from '@/store/context'

/**
 * Render page with naive ui
 */
export async function render(url: string, manifest: any, ctx: Context) {
  const { head, app, router, store } = createApp(ctx)

  // 向 store 里面注入 context
  const contextStore = useContextStore()
  const { ipData, platform, language, isIOS, isSupportWebp, isBot } = ctx.state
  contextStore.$patch({
    language: language,
    ip: ipData.ip,
    country: ipData.country,
    platform: platform,
    webp: isSupportWebp,
    isIOS: isIOS,
    isBot: isBot
  })

  router.push(url)
  await router.isReady()

  const SSRCtx: SSRContext = {}
  const { collect } = setup(app)

  const appHtml = await renderToString(app, SSRCtx)
  const storeHtml = `<script>window.__INITIAL_STATE__=${JSON.stringify(
    store.state.value
  )}</script>`
  const cssHtml = collect()
  const preloadLinks = renderPreloadLinks(ctx.modules, manifest)

  return {
    head,
    appHtml,
    storeHtml,
    cssHtml,
    preloadLinks
  }
}

function renderPreloadLinks(modules: any, manifest: any) {
  let links = ''
  const seen = new Set()
  if (modules) {
    modules.forEach((id: string) => {
      const files = manifest[id]
      if (files) {
        files.forEach((file: string) => {
          if (!seen.has(file)) {
            seen.add(file)
            links += renderPreloadLink(file)
          }
        })
      }
    })
  }
  return links
}

function renderPreloadLink(file: string) {
  if (file.endsWith('.js')) {
    return `<link rel="modulepreload" crossorigin href="${file}">`
  } else if (file.endsWith('.css')) {
    return `<link rel="stylesheet" href="${file}">`
  } else if (file.endsWith('.woff')) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`
  } else if (file.endsWith('.woff2')) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`
  } else if (file.endsWith('.gif')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/gif">`
  } else if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`
  } else if (file.endsWith('.png')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/png">`
  } else {
    // TODO
    return ''
  }
}
