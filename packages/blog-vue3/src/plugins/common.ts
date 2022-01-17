import { pluginOptions } from '@/plugins'

export default ({ app }: pluginOptions) => {
  app.config.globalProperties = {
    test: 'test'
  }
}
