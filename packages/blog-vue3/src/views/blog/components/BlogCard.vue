<template>
  <div class="flex">
    <div class="flex-1">
      <n-ellipsis :tooltip="false" :line-clamp="1" class="max-w-240">
        {{ props.cardData.title }}
      </n-ellipsis>
      <n-ellipsis :tooltip="false" :line-clamp="1" class="max-w-240">
        {{ props.cardData.subtitle }}
      </n-ellipsis>
      <p>
        <n-tag type="info" size="small" round>
          {{ props.cardData.author }}
        </n-tag>
        <n-tag type="success" size="small" round>
          {{ props.cardData.subcategory }}
        </n-tag>
      </p>
    </div>
    <n-image width="100" :src="props.cardData.subcategory" />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  cardData: {
    title: string
    subtitle: string
    author: string
    category: string
    subcategory: string
    pic: string
  }
}

const props = withDefaults(defineProps<Props>(), {
  cardData: () => {
    title: 'testtttttttt',
    subtitle: 'test',
    author: 'yangzhou',
    category: 'life',
    subcategory: 'test',
    pic: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
  }
})
</script>
