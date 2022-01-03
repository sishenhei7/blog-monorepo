import { Context } from 'koa'
import KoaRouter from 'koa-router'
import cors from '@koa/cors'

const router = new KoaRouter()

// 用于服务器监测
router.get('/_ping', async (ctx: Context) => {
  ctx.status = 200
  ctx.body = 'pong'
})

// 单路由的 cors 设置
router.all(
  '/test-cors',
  cors({
    allowMethods: 'GET,OPTIONS'
  }),
  async (ctx: Context) => {
    ctx.status = 200
    ctx.body = 'test cors'
  }
)

export default router
