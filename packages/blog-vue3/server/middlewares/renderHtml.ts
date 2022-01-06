import fs from 'fs'
import path from 'path'
import { ViteDevServer } from 'vite'
import { Context, Next } from 'koa'
import send from 'koa-send'
import { logger, isProd } from '~/server/utils'

async function render(vite: ViteDevServer, ctx: Context) {
  const { url } = ctx.req

  try {
    const manifest = isProd
      ? require(path.resolve('dist/app/client/ssr-manifest.json'))
      : {}

    // 1. 读取 index.html
    let template
    if (!isProd) {
      template = fs.readFileSync(
        path.resolve(__dirname, '../../index.html'),
        'utf-8'
      )
    } else {
      template = fs.readFileSync(
        path.resolve('dist/app/client/index.html'),
        'utf-8'
      )
    }

    // 2. 应用 Vite HTML 转换。这将会注入 Vite HMR 客户端，
    //    同时也会从 Vite 插件应用 HTML 转换。
    //    例如：@vitejs/plugin-react 中的 global preambles
    if (!isProd) {
      template = await vite.transformIndexHtml(url as string, template)
    }

    // 3. 加载服务器入口。vite.ssrLoadModule 将自动转换
    //    你的 ESM 源码使之可以在 Node.js 中运行！无需打包
    //    并提供类似 HMR 的根据情况随时失效。
    let render
    if (!isProd) {
      render = (await vite.ssrLoadModule('@/entry-server')).render
    } else {
      render = require(path.resolve('dist/app/server/entry-server.js')).render
    }

    // 4. 渲染应用的 HTML。这假设 entry-server.js 导出的 `render`
    //    函数调用了适当的 SSR 框架 API。
    //    例如 ReactDOMServer.renderToString()
    const {
      appHtml,
      cssHtml = '',
      preloadLinks = ''
    } = await render(url, manifest)

    // 5. 注入渲染后的应用程序 HTML 到模板中。
    const html = template
      .replace(`<!--preload-links-->`, preloadLinks)
      .replace(`<!--css-outlet-->`, cssHtml)
      .replace(`<!--ssr-outlet-->`, appHtml)

    // 6. 返回渲染后的 HTML。
    ctx.set({ 'Content-Type': 'text/html' })
    ctx.status = 200
    ctx.body = html
  } catch (e) {
    if (e instanceof Error) {
      // 如果捕获到了一个错误，让 Vite 来修复该堆栈，这样它就可以映射回
      // 你的实际源码中。
      vite.ssrFixStacktrace(e)
      logger.error(e)
    } else {
      logger.error(JSON.stringify(e))
    }

    // 生产环境回退到 csr
    if (isProd) {
      await send(ctx, 'dist/app/client/index.html')
    }
  }
}

export default function renderHtmlMiddleware(vite: ViteDevServer) {
  return async (ctx: Context, next: Next) => {
    if (ctx.method === 'HEAD' || ctx.method === 'GET') {
      await render(vite, ctx)
    } else {
      await next()
    }
  }
}
