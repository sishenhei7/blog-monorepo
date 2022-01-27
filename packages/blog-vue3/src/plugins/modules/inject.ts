import { PluginOptions } from '@/plugins'

export default (pluginCtx: PluginOptions) => {
  const { isClient, ctx, app } = pluginCtx
  pluginCtx.$inject = (name, instance) => {
    if (isClient) {
      app.config.globalProperties[name] = instance
    } else {
      ctx!.state[name] = instance
    }
  }
}
