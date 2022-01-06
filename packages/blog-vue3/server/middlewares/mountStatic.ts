import path from 'path'
import mount from 'koa-mount'
import staticMiddleware from 'koa-static'

export default function mountStaticMiddleware(url: string, dir: string) {
  return mount(url, staticMiddleware(path.resolve(dir)))
}
