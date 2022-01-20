<template>
  <n-tabs type="line">
    <n-tab-pane
      v-for="item in tabData"
      :key="item.name"
      :name="item.name"
      :tab="item.tab"
    >
      {{ item.content }}
    </n-tab-pane>
  </n-tabs>
</template>
<script lang="ts" setup>
interface Props {
  blogData: object[]
}

const props = withDefaults(defineProps<Props>(), {
  blogData: () => []
})

const tabData = props.blogData.map((item) => ({
  name: item.name,
  tab: item.tab,
  content: item.content
}))
</script>
