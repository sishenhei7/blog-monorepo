<template>
  <BlogContent :blog-data="blogData" />
</template>

<script lang="ts" setup>
import BlogContent from './components/BlogContent.vue'

const blogData = [
  {
    name: 'oasis',
    tab: 'Oasis',
    content: 'Wonderwall'
  },
  {
    name: 'the beatles',
    tab: 'the Beatles',
    content: 'Hey Jude'
  },
  {
    name: 'jay chou',
    tab: '周杰伦',
    content: '七里香'
  }
]
</script>
