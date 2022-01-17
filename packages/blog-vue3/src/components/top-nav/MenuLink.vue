<template>
  <NMenu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
</template>
<script lang="ts">
import { defineComponent, h, resolveComponent, ref } from 'vue'
import { NMenu } from 'naive-ui'

const menuOptions = [
  {
    key: 'nav-link-blog',
    label: () =>
      h(
        resolveComponent('router-link'),
        {
          to: {
            name: 'Blog'
          }
        },
        ''
      )
  },
  {
    key: 'nav-link-about',
    label: () =>
      h(
        resolveComponent('router-link'),
        {
          to: {
            name: 'About'
          }
        },
        ''
      )
  }
]

export default defineComponent({
  name: 'MenuLink',
  components: {
    NMenu
  },
  setup() {
    return {
      activeKey: ref(null),
      menuOptions: menuOptions
    }
  }
})
</script>
<style lang="scss" scoped></style>
