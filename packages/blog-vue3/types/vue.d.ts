import { Context } from 'koa'
import { Pinia } from 'pinia'
import { Router } from 'vue-router'

interface AsyncDataProps {
  ctx: Context
  store: Pinia
  router: Router
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomOptions {
    asyncData?(args: AsyncDataProps): Promise<void>
  }
}
