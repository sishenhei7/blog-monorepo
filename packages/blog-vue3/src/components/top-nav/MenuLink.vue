<template>
  <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

const menuOptions = []

export default defineComponent({
  name: 'MenuLink',
  setup() {
    return {
      activeKey: ref(null),
      menuOptions: menuOptions
    }
  }
})
</script>
<style lang="scss" scoped></style>
