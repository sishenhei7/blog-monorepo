<template>
  <TopNav />

  <router-view />

  <n-backTop :bottom="100" :visibility-height="300">
    <div class="back-to-top">回到顶部</div>
  </n-backTop>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TopNav from '@/components/top-nav/index.vue'

export default defineComponent({
  name: 'App',
  components: {
    TopNav
  }
})
</script>
