import { App } from 'vue'
import { Pinia } from 'pinia'
import { Router } from 'vue-router'
import { Context } from 'koa'
import { I18n } from 'vue-i18n'
import storePlugin from './store'
import commonPlugin from './common'

export interface pluginOptions {
  ctx?: Context
  isClient: boolean
  app: App<Element>
  store: Pinia
  router: Router
  i18n: I18n
}

export default [storePlugin, commonPlugin]
