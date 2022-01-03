import { Context } from 'koa'
import KoaRouter from 'koa-router'

const router = new KoaRouter()

// 用于服务器监测
router.get('/_ping', async (ctx: Context) => {
  ctx.status = 200
  ctx.body = 'pong'
})

export default router
