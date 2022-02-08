import { Context } from 'koa'
import { Pinia } from 'pinia'
import { Router } from 'vue-router'
import { toRef } from '@vue/runtime-core'

interface AsyncDataProps {
  ctx: Context
  store: Pinia
  router: Router
}

// 对vue进行类型补充说明
declare module '@vue/runtime-core' {
  interface ComponentCustomOptions {
    asyncData?(args: AsyncDataProps): Promise<void>
  }
}
