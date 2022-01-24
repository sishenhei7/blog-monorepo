import {
  // create naive ui
  create,
  // component
  NButton,
  NAffix,
  NTag,
  NBackTop,
  NMenu,
  NTabs,
  NTabPane,
  NIcon,
  NEllipsis,
  NThing,
  NImage,
  NSpace,
  NDivider
} from 'naive-ui'
import { PluginOptions } from '@/plugins'

export default ({ app }: PluginOptions) => {
  const naive = create({
    components: [
      NButton,
      NAffix,
      NTag,
      NBackTop,
      NMenu,
      NTabs,
      NTabPane,
      NIcon,
      NEllipsis,
      NThing,
      NImage,
      NSpace,
      NDivider
    ]
  })
  app.use(naive)
}
