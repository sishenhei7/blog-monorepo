import mount from 'koa-mount'
import staticMiddleware from 'koa-static'
import { resolveCwd } from '~/server/utils'

export default (url: string, p: string) =>
  mount(url, staticMiddleware(resolveCwd(p)))
