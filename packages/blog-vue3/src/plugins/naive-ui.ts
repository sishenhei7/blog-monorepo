import {
  // create naive ui
  create,
  // component
  NButton,
  NAffix,
  NTag,
  NBackTop,
  NMenu
} from 'naive-ui'
import { PluginOptions } from '@/plugins'

export default ({ app }: PluginOptions) => {
  const naive = create({
    components: [NButton, NAffix, NTag, NBackTop, NMenu]
  })
  app.use(naive)
}
