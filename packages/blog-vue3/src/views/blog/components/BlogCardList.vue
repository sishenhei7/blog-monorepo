<template>
  <n-tabs type="line" class="w-680px">
    <n-tab-pane
      v-for="item in tabData"
      :key="item.name"
      :name="item.name"
      :tab="item.tab"
    >
      <n-space vertical class="divide-y">
        <BlogCard
          v-for="card in item.data"
          :key="card.title"
          :card-data="card"
          class="py-10px"
        />
      </n-space>
    </n-tab-pane>
  </n-tabs>
</template>
<script lang="ts" setup>
import BlogCard from './BlogCard.vue'

interface Props {
  blogListData: object[]
}

const props = withDefaults(defineProps<Props>(), {
  blogListData: () => []
})

const tabData = props.blogListData.map((item) => ({ ...item }))
</script>
