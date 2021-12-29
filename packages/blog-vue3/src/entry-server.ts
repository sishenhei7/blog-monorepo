import createApp from '@/main'
import { renderToString, SSRContext } from 'vue/server-renderer'
import { setup } from '@css-render/vue3-ssr'

/**
 * Render page with naive ui
 */
export async function render(url: string, manifest: any) {
  const { app, router } = createApp()

  router.push(url)
  await router.isReady()

  const ctx: SSRContext = {}
  const { collect } = setup(app)

  const appHtml = await renderToString(app, ctx)
  const cssHtml = collect()
  const preloadLinks = renderPreloadLinks(ctx.modules, manifest)

  return {
    cssHtml,
    appHtml,
    preloadLinks
  }
}

function renderPreloadLinks(modules: any, manifest: any) {
  let links = ''
  const seen = new Set()
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

function renderPreloadLink(file: string) {
  if (file.endsWith('.css')) {
    return `<link rel="preload" as="style" href="${file}" />`
  } else if (file.endsWith('.js')) {
    return `<link rel="preload" as="script" href="${file}" />`
  } else if (file.endsWith('.woff2')) {
    return `<link rel="preload" as="font" href="${file}" type="font/woff2" />`
  } else if (file.endsWith('.woff')) {
    return `<link rel="preload" as="font" href="${file}" type="font/woff" />`
  } else if (file.endsWith('.ttf')) {
    return `<link rel="preload" as="font" href="${file}" type="font/ttf" />`
  } else if (file.endsWith('.eot')) {
    return `<link rel="preload" as="font" href="${file}" type="font/eot" />`
  } else {
    return ''
  }
}
