import fs from 'fs'
import path from 'path'
import { ViteDevServer } from 'vite'
import { Context, Next } from 'koa'
import logger from '~/server/logger'

// const isProd = process.env.NODE_ENV === 'production'

async function render(ctx: Context, vite: ViteDevServer) {
  const { url } = ctx.req

  try {
    // 1. 读取 index.html
    let template = fs.readFileSync(
      path.resolve(__dirname, '../../index.html'),
      'utf-8'
    )

    // 2. 应用 Vite HTML 转换。这将会注入 Vite HMR 客户端，
    //    同时也会从 Vite 插件应用 HTML 转换。
    //    例如：@vitejs/plugin-react 中的 global preambles
    template = await vite.transformIndexHtml(url as string, template)

    // 3. 加载服务器入口。vite.ssrLoadModule 将自动转换
    //    你的 ESM 源码使之可以在 Node.js 中运行！无需打包
    //    并提供类似 HMR 的根据情况随时失效。
    const { render } = await vite.ssrLoadModule('@/entry-server')

    // 4. 渲染应用的 HTML。这假设 entry-server.js 导出的 `render`
    //    函数调用了适当的 SSR 框架 API。
    //    例如 ReactDOMServer.renderToString()
    const { appHtml, cssHtml } = await render(url)

    // 5. 注入渲染后的应用程序 HTML 到模板中。
    const html = template
      .replace(`<!--ssr-outlet-->`, appHtml)
      .replace(`<!--css-outlet-->`, cssHtml)

    // 6. 返回渲染后的 HTML。
    ctx.set({ 'Content-Type': 'text/html' })
    ctx.status = 200
    ctx.body = html
  } catch (e) {
    ctx.status = 500

    if (e instanceof Error) {
      // 如果捕获到了一个错误，让 Vite 来修复该堆栈，这样它就可以映射回
      // 你的实际源码中。
      vite.ssrFixStacktrace(e)
      logger.error(e)
      ctx.body = e.message
    } else {
      ctx.status = 500
      ctx.body = e
    }
  }
}

export default (vite: ViteDevServer) => async (ctx: Context, next: Next) => {
  await render(ctx, vite)
  next()
}
