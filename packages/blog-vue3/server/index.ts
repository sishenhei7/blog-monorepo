import koa from 'koa'
import path from 'path'
import { createServer as createViteServer } from 'vite'
import mount from 'koa-mount'
import staticMiddleware from 'koa-static'
import compressMiddleware from 'koa-compress'

import config from '~/server/config'
import router from '~/server/router'
import logger from '~/server/logger'
import Cache from '~/server/cache'
import createViteMiddleware from '~/server/middlewares/vite'
import createRenderer from '~/server/middlewares/render'

const isProd = process.env.NODE_ENV === 'production'

async function createServer() {
  const app = new koa()
  const vite = await createViteServer({
    server: {
      middlewareMode: 'ssr'
    }
  })

  app.context.$cache = new Cache({ ...config.redis })

  app.use(router.routes()).use(router.allowedMethods())

  if (!isProd) {
    app.use(createViteMiddleware(vite))
  } else {
    app.use(compressMiddleware())
    app.use(
      mount(
        '/app/client',
        staticMiddleware(path.resolve(process.cwd(), 'dist/app/client'))
      )
    )
  }

  app.use(createRenderer(vite))

  logger.log('Ready to start Server')
  app.listen(9000, () => {
    logger.success(`Server listening on http://localhost:9000`)
  })
}

createServer()
