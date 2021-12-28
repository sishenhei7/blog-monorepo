// require('module-alias/register')
import koa from 'koa'
import { createServer as createViteServer } from 'vite'

import config from '~/server/config'
import renderer from '~/server/render'
import router from '~/server/router'
import logger from '~/server/logger'
import Cache from '~/server/cache'
import viteMiddleware from '~/server/middlewares/vite'

async function createServer() {
  const app = new koa()
  const vite = await createViteServer({
    server: {
      middlewareMode: 'ssr'
    }
  })

  app.context.$cache = new Cache({ ...config.redis })

  app.use(router.routes()).use(router.allowedMethods())

  app.use(viteMiddleware(vite))

  app.use((ctx) => {
    renderer(ctx, vite)
  })

  logger.log('Ready to start Server')
  app.listen(9000, () => {
    logger.success(`Server listening on http://localhost:9000`)
  })
}

createServer()
