import { createSSRApp } from 'vue'
import App from '@/App.vue'
import createRouter from '@/router'
import createI18n from '@/i18n'
import '@/styles/variable.scss'

export default () => {
  const app = createSSRApp(App)
  const router = createRouter()
  const i18n = createI18n()
  app.use(router).use(i18n)
  return { app, router }
}
