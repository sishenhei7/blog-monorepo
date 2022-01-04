import vite from './vite'
import renderHtml from './renderHtml'
import mountStatic from './mountStatic'
import robots from './robots'
import time from './time'
import proxy from './proxy'

const middlewares = {
  robots,
  vite,
  renderHtml,
  mountStatic,
  time,
  proxy
}

export default middlewares
