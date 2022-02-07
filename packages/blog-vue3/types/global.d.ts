import { Context } from 'koa'
import { Pinia } from 'pinia'
import { Router } from 'vue-router'

declare global {
  interface Window {
    __INITIAL_STATE__: any
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomOptions {
    asyncData?(ctx: Context, store: Pinia, router: Router): Promise<void>
  }
}

export {}
