import { PluginOptions } from '@/plugins'

export default (pluginCtx: PluginOptions) => {
  const { isClient, router, ctx } = pluginCtx
  pluginCtx.redirect = (url, status) => {
    const path = typeof url === 'string' ? url : router.resolve(url).fullPath

    if (isClient) {
      window.location.assign(path)
    } else {
      ctx!.status = status || 302
      ctx!.redirect(path)
    }
  }
}
