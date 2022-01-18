<template>
  <ul class="menu-link">
    <li v-for="menuItem in menuData" :key="menuItem.name">
      <router-link :to="{ path: menuItem.path }">
        {{ menuItem.name }}
      </router-link>
    </li>
  </ul>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MenuLink',
  setup() {
    const menuData = [
      {
        name: 'Blog',
        path: '/blog'
      },
      {
        name: 'About',
        path: '/about'
      }
    ]
    return {
      menuData
    }
  }
})
</script>
<style lang="scss" scoped></style>
