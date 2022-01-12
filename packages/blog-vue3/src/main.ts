import { createSSRApp } from 'vue'
import { Context } from 'koa'
import App from '@/App.vue'
import createRouter from '@/router'
import createI18n from '@/i18n'

export default (ctx?: Context) => {
  const app = createSSRApp(App)
  const router = createRouter()
  const i18n = createI18n()
  app.use(router).use(i18n)
  return { app, router }
}
