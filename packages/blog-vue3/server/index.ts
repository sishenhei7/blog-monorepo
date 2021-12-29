import koa from 'koa'
import { createServer as createViteServer } from 'vite'

import config from '~/server/config'
import router from '~/server/router'
import logger from '~/server/logger'
import Cache from '~/server/cache'
import createViteMiddleware from '~/server/middlewares/vite'
import createRenderer from '~/server/middlewares/render'

async function createServer() {
  const app = new koa()
  const vite = await createViteServer({
    server: {
      middlewareMode: 'ssr'
    }
  })

  app.context.$cache = new Cache({ ...config.redis })

  app.use(router.routes()).use(router.allowedMethods())

  app.use(createViteMiddleware(vite))

  app.use(createRenderer(vite))

  logger.log('Ready to start Server')
  app.listen(9000, () => {
    logger.success(`Server listening on http://localhost:9000`)
  })
}

createServer()
