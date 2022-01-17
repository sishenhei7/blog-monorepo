import createApp from '@/main'
import plugins from '@/plugins'

async function main() {
  const { app, store, router, i18n } = await createApp()
  await router.isReady()

  // 客户端插件
  await Promise.all(
    plugins.map((plugin) =>
      plugin({
        isClient: true,
        app,
        store,
        router,
        i18n
      })
    )
  )

  app.mount('#app')
}

main()
