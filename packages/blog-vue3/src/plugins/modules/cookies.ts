import Cookies from 'js-cookie'
import { PluginOptions } from '@/plugins'

export default (pluginCtx: PluginOptions) => {
  const { isClient, ctx, app } = pluginCtx
  pluginCtx.$cookies = {
    get: (key: string) => {
      if (isClient) {
        return Cookies.get(key)
      }
      return ctx!.cookies.get(key)
    },
    set: (key: string, value: any, options: any) => {
      if (isClient) {
        return Cookies.set(key, value, options)
      }
      return ctx!.cookies.set(key, value, options)
    }
  }
}
