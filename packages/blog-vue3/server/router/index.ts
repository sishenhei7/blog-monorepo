import { Context } from 'koa'
import KoaRouter from 'koa-router'

const router = new KoaRouter()

router.get('/test', async (ctx: Context) => {
  ctx.set({ 'Content-Type': 'text/html' })
  ctx.status = 200
  ctx.body = 'test'
})

export default router
