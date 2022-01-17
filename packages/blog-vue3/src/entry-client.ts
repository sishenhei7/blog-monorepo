import createApp from '@/main'

;(async () => {
  const { app, router, store } = createApp()
  await router.isReady()

  const initialState = window.__INITIAL_STATE__
  if (initialState && store) {
    store.state.value = JSON.parse(initialState)
  }

  app.mount('#app')
})()
