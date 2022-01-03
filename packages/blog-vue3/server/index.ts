import koa from 'koa'
import { createServer as createViteServer } from 'vite'
import compressMiddleware from 'koa-compress'

import config from '~/server/config'
import router from '~/server/router'
import Cache from '~/server/cache'
import middlewares from '~/server/middlewares'
import { logger, isProd } from '~/server/utils'

async function createServer() {
  const app = new koa()
  const vite = await createViteServer({
    server: {
      middlewareMode: 'ssr'
    }
  })

  app.context.$cache = new Cache({ ...config.redis })

  app.use(middlewares.time())

  app.use(middlewares.robots())

  app.use(router.routes()).use(router.allowedMethods())

  if (!isProd) {
    app.use(middlewares.viteMiddleware(vite))
  } else {
    app.use(compressMiddleware())
    app.use(middlewares.mountStatic('/app/client', 'dist/app/client'))
  }

  app.use(middlewares.renderHtml(vite))

  logger.log('Ready to start Server')
  app.listen(9000, () => {
    logger.success(`Server listening on http://localhost:9000`)
  })
}

createServer()
