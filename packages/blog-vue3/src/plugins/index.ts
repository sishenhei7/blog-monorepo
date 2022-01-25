import { App } from 'vue'
import { Pinia } from 'pinia'
import { Router } from 'vue-router'
import { Context } from 'koa'
import { I18n } from 'vue-i18n'
import modulePlugins from './modules'
import storePlugin from './store'
import commonPlugin from './common'
import asyncDataPlugin from './asyncData'
import naiveUiPlugin from './naive-ui'

export type Plugin = (options: PluginOptions) => void

export interface PluginOptions {
  ctx?: Context
  isClient: boolean
  app: App<Element>
  store: Pinia
  router: Router
  i18n: I18n
  inject?: (name: string, instance: any) => void
  redirect?: (url: string | Object, status?: number) => void
  cookies?: {
    get: (name: string) => string | undefined
    set: (name: string, value: string, options?: any) => void
  }
}

export default [
  ...modulePlugins,
  storePlugin,
  commonPlugin,
  asyncDataPlugin,
  naiveUiPlugin
]
