import koa from 'koa'
import { createServer as createViteServer } from 'vite'
import compressMiddleware from 'koa-compress'
import helmetMiddeware from 'koa-helmet'

import '~/server/loadEnv'
import router from '~/server/router'
import {
  requestIdMiddleware,
  cacheMiddleware,
  parseIpMiddleware,
  detectDeviceMiddleware,
  detectCountryMiddleware,
  detectLanguageMiddleware,
  detectFeatureMiddleware
} from '~/server/middlewares/common'
import robotsMiddleware from '~/server/middlewares/robots'
import timeMiddleware from '~/server/middlewares/time'
import proxyMiddleware from '~/server/middlewares/proxy'
import viteMiddleware from '~/server/middlewares/vite'
import mountStaticMiddleware from '~/server/middlewares/mountStatic'
import renderHtmlMiddleware from '~/server/middlewares/renderHtml'
import cacheHtmlMiddleware from '~/server/middlewares/cacheHtml'
import { logger, isProd, getMmdb } from '~/server/utils'

async function createServer() {
  const app = new koa()
  const vite = await createViteServer({
    server: {
      middlewareMode: 'ssr'
    }
  })
  const mmdb = await getMmdb()

  app.use(robotsMiddleware())

  // 生产环境静态资源提前
  if (isProd) {
    app.use(compressMiddleware())
    app.use(mountStaticMiddleware('/app/client', 'dist/app/client'))
  }

  app.use(proxyMiddleware())

  app.use(timeMiddleware())

  app.use(
    helmetMiddeware({
      contentSecurityPolicy: false
    })
  )

  app.use(requestIdMiddleware())

  app.use(cacheMiddleware())

  app.use(parseIpMiddleware(mmdb))

  app.use(router.routes()).use(router.allowedMethods())

  // 开发环境让 vite 处理资源问题
  if (!isProd) {
    app.use(viteMiddleware(vite))
  }

  // 页面需要用到的数据
  app.use(detectCountryMiddleware())
  app.use(detectLanguageMiddleware())
  app.use(detectDeviceMiddleware())
  app.use(detectFeatureMiddleware())

  // 页面缓存
  app.use(cacheHtmlMiddleware())

  // 页面渲染
  app.use(renderHtmlMiddleware(vite))

  logger.log('Ready to start Server')
  app.listen(9000, () => {
    logger.success(`Server listening on http://localhost:9000`)
  })
}

createServer()
