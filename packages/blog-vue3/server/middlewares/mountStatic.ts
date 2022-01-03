import mount from 'koa-mount'
import staticMiddleware from 'koa-static'
import { resolveCwd } from '~/server/utils'

export default function mountStaticMiddleware(url: string, dir: string) {
  return mount(url, staticMiddleware(resolveCwd(dir)))
}
