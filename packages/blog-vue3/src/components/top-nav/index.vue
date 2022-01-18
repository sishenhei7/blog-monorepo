<template>
  <div class="top-nav">
    <MenuLink />
    <UserCenter />
  </div>
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
  position: relative;
  display: flex;
  justify-content: space-between;

  min-width: 999px;
  min-height: 56px;
  z-index: 1000;
}
</style>
