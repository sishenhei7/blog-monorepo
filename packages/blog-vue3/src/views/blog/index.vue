<template>
  <div class="blog">
    <BlogNav />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BlogNav from './BlogNav.vue'

export default defineComponent({
  name: 'BlogIndex',
  components: {
    BlogNav
  }
})
</script>

<style lang="scss" scoped>
.blog {
  margin: 0 auto;
  padding-left: 180px;
  width: 980px;
}
</style>
