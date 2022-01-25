import { PluginOptions } from '@/plugins'

export default async ({ ctx, store, isClient, router }: PluginOptions) => {
  // TODO: component diff
  if (isClient) {
    return
  }

  const matchedComponents = router.currentRoute.value.matched.flatMap(
    (record) => Object.values(record.components)
  )

  if (!matchedComponents) {
    // TODO: 使用改变路由的方式
    return ctx?.redirect('404')
  }

  await Promise.all(
    matchedComponents.map((component: any) => {
      if (component.asyncData) {
        return component.asyncData({
          ctx,
          store,
          router
        })
      }
    })
  )
}
