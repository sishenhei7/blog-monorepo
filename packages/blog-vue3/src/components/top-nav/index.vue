<template>
  <div class="sticky top-0 z-40 w-full h-12 border-b backdrop-blur bg-white">
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
