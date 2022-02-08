import { createSSRApp } from 'vue'
import { createHead } from '@vueuse/head'
import App from '@/App.vue'
import createRouter from '@/router'
import createI18n from '@/i18n'
import createStore from '@/store'
import 'virtual:windi.css'
import './global'

export default async () => {
  const app = createSSRApp(App)

  const store = createStore()
  app.use(store)

  const head = createHead()
  app.use(head)

  const router = createRouter()
  app.use(router)

  const i18n = await createI18n()
  app.use(i18n)

  return { head, app, router, store, i18n }
}
