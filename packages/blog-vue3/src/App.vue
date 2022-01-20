<template>
  <TopNav />

  <router-view />

  <n-backTop :bottom="100" :visibility-height="300">
    <div class="back-to-top">回到顶部</div>
  </n-backTop>
</template>

<script lang="ts" setup>
import TopNav from '@/components/top-nav/index.vue'
</script>
