<template>
  <BlogCardList :blog-list-data="blogListData" />
</template>

<script lang="ts" setup>
import BlogCardList from './components/BlogCardList.vue'

const blogListData = [
  {
    name: 'oasis',
    tab: 'Oasis',
    content: 'Wonderwall',
    data: [
      {
        title:
          'testtttttttt测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
        link: '/about',
        subtitle: 'test',
        author: 'yangzhou',
        category: 'life',
        subcategory: 'test',
        pic: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
      },
      {
        title:
          'testtttttttt测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
        link: '/about',
        subtitle: 'test',
        author: 'yangzhou',
        category: 'life',
        subcategory: 'test',
        pic: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
      },
      {
        title:
          'testtttttttt测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
        link: '/about',
        subtitle: 'test',
        author: 'yangzhou',
        category: 'life',
        subcategory: 'test',
        pic: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
      },
      {
        title:
          'testtttttttt测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
        link: '/about',
        subtitle: 'test',
        author: 'yangzhou',
        category: 'life',
        subcategory: 'test',
        pic: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
      },
      {
        title:
          'testtttttttt测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
        link: '/about',
        subtitle: 'test',
        author: 'yangzhou',
        category: 'life',
        subcategory: 'test',
        pic: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
      },
      {
        title:
          'testtttttttt测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
        link: '/about',
        subtitle: 'test',
        author: 'yangzhou',
        category: 'life',
        subcategory: 'test',
        pic: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
      }
    ]
  },
  {
    name: 'the beatles',
    tab: 'the Beatles',
    content: 'Hey Jude',
    data: [
      {
        title:
          'testtttttttt测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
        link: '/about',
        subtitle: 'test',
        author: 'yangzhou',
        category: 'life',
        subcategory: 'test',
        pic: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
      },
      {
        title:
          'testtttttttt测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
        link: '/about',
        subtitle: 'test',
        author: 'yangzhou',
        category: 'life',
        subcategory: 'test',
        pic: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
      }
    ]
  },
  {
    name: 'jay chou',
    tab: '周杰伦',
    content: '七里香',
    data: [
      {
        title:
          'testtttttttt测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
        link: '/about',
        subtitle: 'test',
        author: 'yangzhou',
        category: 'life',
        subcategory: 'test',
        pic: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
      }
    ]
  }
]
</script>
