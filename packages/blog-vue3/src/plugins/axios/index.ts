/**
 * 封装的 axios 主要有以下作用：
 * 1.自动处理错误
 * 2.在server端透传headers等参数
 * 3.记录log
 */
import Axios from 'axios'
import { PluginOptions } from '@/plugins'

export default async ({ ctx, store, isClient, router, app }: PluginOptions) => {
  const axiosTimeout = isClient ? 15000 : 6000
  const baseURL = isClient ? process.env.API_URL_BROWSER : process.env.API_URL
  const axios = Axios.create({
    baseURL,
    timeout: axiosTimeout,
    withCredentials: false,
    headers: {
      Version: '1.0',
      Accept: 'application/json, text/plain, */*',
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
  app.config.globalProperties.$axios = axios
}
