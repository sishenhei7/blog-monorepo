<template>
  <div class="blog">
    <BlogNav />
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import BlogNav from './components/BlogNav.vue'
</script>
