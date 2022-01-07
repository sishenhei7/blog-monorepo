import koa from 'koa'
import { createServer as createViteServer } from 'vite'
import compressMiddleware from 'koa-compress'

import config from './config'
import router from './router'
import {
  requestIdMiddleware,
  cacheMiddleware,
  parseIpMiddleware,
  detectDeviceMiddleware,
  detectCountryMiddleware,
  detectLanguageMiddleware,
  detectFeatureMiddleware
} from './middlewares/common'
import robotsMiddleware from './middlewares/robots'
import timeMiddleware from './middlewares/time'
import proxyMiddleware from './middlewares/proxy'
import viteMiddleware from './middlewares/vite'
import mountStaticMiddleware from './middlewares/mountStatic'
import renderHtmlMiddleware from './middlewares/renderHtml'
import cacheHtmlMiddleware from './middlewares/cacheHtml'
import { logger, isProd, getMmdb } from './utils'

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

  app.use(proxyMiddleware(config?.server?.proxy))

  app.use(timeMiddleware())

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
  app.use(detectLanguageMiddleware(config?.server?.isAddLangToUrl))
  app.use(detectDeviceMiddleware())
  app.use(detectFeatureMiddleware())

  // 页面缓存
  app.use(cacheHtmlMiddleware(config?.pageCache))

  // 页面渲染
  app.use(renderHtmlMiddleware(vite))

  logger.log('Ready to start Server')
  app.listen(9000, () => {
    logger.success(`Server listening on http://localhost:9000`)
  })
}

createServer()
