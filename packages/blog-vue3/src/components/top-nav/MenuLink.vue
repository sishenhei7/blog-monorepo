<template>
  <ul class="flex relative">
    <li v-for="menuItem in menuData" :key="menuItem.name" class="mr-4">
      <router-link :to="{ path: menuItem.path }">
        {{ menuItem.name }}
      </router-link>
    </li>
  </ul>
</template>
<script lang="ts" setup>
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
</script>
