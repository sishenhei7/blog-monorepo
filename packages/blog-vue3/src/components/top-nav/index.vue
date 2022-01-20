<template>
  <div class="sticky top-0 z-40 w-full border-b backdrop-blur bg-white">
    <div class="p-4 flex relative items-center">
      <div class="mr-4">
        <router-link :to="{ path: '/' }"> Candybullet </router-link>
      </div>
      <MenuLink class="flex-1" />
      <UserCenter />
    </div>
  </div>
</template>
<script lang="ts" setup>
import MenuLink from './MenuLink.vue'
import UserCenter from './UserCenter.vue'
</script>
