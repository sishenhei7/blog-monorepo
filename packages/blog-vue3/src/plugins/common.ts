import { PluginOptions } from '@/plugins'

export default ({ app }: PluginOptions) => {
  app.config.globalProperties = {
    test: 'test'
  }
}
