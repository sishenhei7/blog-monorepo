import koa from 'koa'
import { createServer as createViteServer } from 'vite'
import compressMiddleware from 'koa-compress'

import config from './config'
import router from './router'
import { requestIdMiddleware, cacheMiddleware } from './middlewares/common'
import robotsMiddleware from './middlewares/robots'
import timeMiddleware from './middlewares/time'
import proxyMiddleware from './middlewares/proxy'
import viteMiddleware from './middlewares/vite'
import mountStaticMiddleware from './middlewares/mountStatic'
import renderHtmlMiddleware from './middlewares/renderHtml'
import { logger, isProd } from './utils'

async function createServer() {
  const app = new koa()
  const vite = await createViteServer({
    server: {
      middlewareMode: 'ssr'
    }
  })

  app.use(robotsMiddleware())

  app.use(requestIdMiddleware())

  app.use(cacheMiddleware())

  app.use(timeMiddleware())

  app.use(proxyMiddleware(config.server!.proxy))

  app.use(router.routes()).use(router.allowedMethods())

  if (!isProd) {
    app.use(viteMiddleware(vite))
  } else {
    app.use(compressMiddleware())
    app.use(mountStaticMiddleware('/app/client', 'dist/app/client'))
  }

  app.use(renderHtmlMiddleware(vite))

  logger.log('Ready to start Server')
  app.listen(9000, () => {
    logger.success(`Server listening on http://localhost:9000`)
  })
}

createServer()
