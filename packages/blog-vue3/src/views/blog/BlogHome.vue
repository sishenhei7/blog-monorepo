<template>
  <BlogCardList :blog-list-data="blogListData" />
</template>

<script lang="ts">
import useBlogStore from '@/store/blog'

export default {
  async asyncData() {
    const blogStore = useBlogStore()
    const blogHomeData = [
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
    await blogStore.$patch({
      blogHomeData
    })
  }
}
</script>

<script lang="ts" setup>
// import useBlogStore from '@/store/blog'
import BlogCardList from './components/BlogCardList.vue'

const blogStore = useBlogStore()
const blogListData = blogStore.blogHomeData
</script>
