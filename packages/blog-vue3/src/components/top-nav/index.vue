<template>
  <n-affix :top="0" :trigger-top="0" class="top-nav">
    <div class="top-nav-content">
      <MenuLink />
      <UserCenter />
    </div>
  </n-affix>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import MenuLink from './MenuLink.vue'
import UserCenter from './UserCenter.vue'

export default defineComponent({
  name: 'TopNav',
  components: {
    MenuLink,
    UserCenter
  }
})
</script>
<style lang="scss" scoped>
.top-nav {
  margin: 0;
  padding: 0;
}
</style>
