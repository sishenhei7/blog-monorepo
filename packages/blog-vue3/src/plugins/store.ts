import { PluginOptions } from '@/plugins'
import useContextStore from '@/store/context'

export default ({ ctx, store, isClient }: PluginOptions) => {
  if (isClient) {
    const initialState = window.__INITIAL_STATE__
    if (initialState && store) {
      store.state.value = initialState
    }
    delete window.__INITIAL_STATE__
    return
  }

  const contextStore = useContextStore()
  const { ipData, platform, language, isApp, isIOS, isSupportWebp, isBot } =
    ctx!.state
  contextStore.$patch({
    language: language,
    ip: ipData.ip,
    country: ipData.country,
    platform: platform,
    webp: isSupportWebp,
    isApp: isApp,
    isIOS: isIOS,
    isBot: isBot,
    host: ctx!.host
  })
  return
}
