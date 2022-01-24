<template>
  <div class="pl-180px w-980px mx-auto">
    <div class="w-180px top-72px fixed">
      <BlogNav class="-ml-180px w-180px" />
    </div>
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import BlogNav from './components/BlogNav.vue'
</script>
