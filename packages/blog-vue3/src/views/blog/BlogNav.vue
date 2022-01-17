<template>
  <NAffix :top="120" :trigger-top="60">
    <NTag>顶部触发距离 60px</NTag>
  </NAffix>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { NAffix, NTag } from 'naive-ui'

export default defineComponent({
  name: 'BlogSideBar',
  components: {
    NAffix,
    NTag
  }
})
</script>
