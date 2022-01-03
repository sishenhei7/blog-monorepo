import viteMiddleware from './viteMiddleware'
import renderHtml from './renderHtml'
import mountStatic from './mountStatic'
import robots from './robots'
import time from './time'

const middlewares = {
  robots,
  viteMiddleware,
  renderHtml,
  mountStatic,
  time
}

export default middlewares
