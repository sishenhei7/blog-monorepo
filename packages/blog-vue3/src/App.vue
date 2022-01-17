<template>
  <TopNav />

  <router-view />

  <NBackTop :bottom="100" :visibility-height="300">
    <div class="back-to-top">回到顶部</div>
  </NBackTop>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NBackTop } from 'naive-ui'
import TopNav from '@/components/top-nav/index.vue'

export default defineComponent({
  name: 'App',
  components: {
    TopNav,
    NBackTop
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/variable.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.back-to-top {
  line-height: 40px;
  text-align: center;
  font-size: 14px;
}
</style>
