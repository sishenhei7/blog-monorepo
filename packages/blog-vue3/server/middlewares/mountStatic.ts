import path from 'path'
import mount from 'koa-mount'
import staticMiddleware from 'koa-static'

import config from '~/server/config'

const cacheDuration = config?.cacheControl?.static || null

export default function mountStaticMiddleware(url: string, dir: string) {
  return mount(
    url,
    staticMiddleware(
      path.resolve(dir),
      cacheDuration
        ? {
            setHeaders: (res) =>
              res.setHeader(
                'cache-control',
                `max-age=${cacheDuration}, s-maxage=${cacheDuration}, public`
              )
          }
        : {}
    )
  )
}
