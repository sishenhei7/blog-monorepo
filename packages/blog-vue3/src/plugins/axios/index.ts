/**
 * 封装的 axios 主要有以下作用：
 * 1.自动处理错误
 * 2.在server端透传headers等参数
 * 3.记录log
 */
import Axios from 'axios'
import { PluginOptions } from '@/plugins'
import useContextStore from '@/store/context'

const isDevelopment = process.env.NODE_ENV === 'development'

export default async ({ isClient, ctx, $inject, $cookies }: PluginOptions) => {
  const axiosTimeout = isClient ? 15000 : 6000
  const baseURL = isClient
    ? import.meta.env.VITE_API_URL_BROWSER
    : import.meta.env.VITE_API_URL
  const axios = Axios.create({
    baseURL: `${baseURL}/api`,
    timeout: axiosTimeout,
    withCredentials: false,
    headers: {
      Version: '1.0',
      Accept: 'application/json, text/plain, */*',
      'X-Requested-With': 'XMLHttpRequest'
    }
  })

  const { host, platform, language, isIOS, isApp } = useContextStore()

  axios.interceptors.request.use(
    async (config) => {
      const { headers = {} } = config
      headers._pt = $cookies?.get('_pt') || ''
      headers['X-host'] = host
      headers['X-language'] = language
      headers['X-platform'] = isApp ? (isIOS ? 'ios' : 'android') : platform

      if (isClient) {
        headers['X-CSRF-Token'] = $cookies?.get('CSRF-Token') || ''
      } else {
        const { req } = ctx!

        headers.Cookie = req.headers.cookie || ''
        headers.Referer = req.headers.referer || ''
        headers['User-Agent'] = req.headers['user-agent'] || ''
        headers['X-DeviceID'] = (req.headers['x-deviceid'] as string) || ''
        headers['X-Request-From'] = 'node'

        if (isDevelopment) {
          const realIp = req.headers['X-Real-IP'] as string
          headers['X-Real-IP'] = realIp || ctx!.ip || ''
        }
      }
      return config
    },
    (error) => {
      Promise.reject(error)
    }
  )

  axios.interceptors.response.use(
    async (response) => {
      const { data } = response
      if (typeof data === 'object' && !data.success) {
        const error = {
          code: '',
          message: 'error',
          ...(data.error || {})
        }
        // TODO: 发送log到服务器
        return Promise.reject(error)
      }
      return response
    },
    (error) => {
      if (Axios.isCancel(error)) {
        console.log('Request canceled', error.message)
      }
      // TODO: 各种code判断，特别是403跳转登录页
      return Promise.reject(error)
    }
  )

  $inject!('$axios', axios)
}
