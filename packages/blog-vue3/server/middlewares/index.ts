import viteMiddleware from './viteMiddleware'
import renderHtml from './renderHtml'
import mountStatic from './mountStatic'
import robots from './robots'

const middlewares = {
  robots,
  viteMiddleware,
  renderHtml,
  mountStatic
}

export default middlewares
