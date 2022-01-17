<template>
  <NAffix :top="0" :trigger-top="0" class="top-nav">
    <div class="top-nav-content">
      <MenuLink />
      <UserCenter />
    </div>
  </NAffix>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { NAffix } from 'naive-ui'
import MenuLink from './MenuLink.vue'
import UserCenter from './UserCenter.vue'

export default defineComponent({
  name: 'TopNav',
  components: {
    NAffix,
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
