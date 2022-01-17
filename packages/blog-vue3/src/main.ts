import { createSSRApp } from 'vue'
import { Context } from 'koa'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import App from '@/App.vue'
import createRouter from '@/router'
import createI18n from '@/i18n'
import createStore from '@/store'

export default (ctx?: Context) => {
  const app = createSSRApp(App)

  const head = createHead()
  app.use(head)

  const router = createRouter()
  app.use(router)

  const i18n = createI18n()
  app.use(i18n)

  const store = createStore()
  app.use(store)

  return { head, app, router, store }
}
