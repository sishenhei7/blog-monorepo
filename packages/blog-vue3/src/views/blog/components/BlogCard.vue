<template>
  <router-link
    v-if="cardData"
    :to="{ path: props.cardData.link }"
    target="_blank"
    class="group flex"
  >
    <div class="flex-1 pr-20px">
      <n-space vertical>
        <n-ellipsis
          :tooltip="false"
          :line-clamp="1"
          class="text-2xl group-hover:text-sky-400"
        >
          {{ props.cardData.title }}
        </n-ellipsis>
        <n-ellipsis
          v-if="props.cardData.subtitle"
          :tooltip="false"
          :line-clamp="1"
          class="text-base"
        >
          {{ props.cardData.subtitle }}
        </n-ellipsis>
        <n-space>
          <n-tag type="info" size="small" round>
            {{ props.cardData.author }}
          </n-tag>
          <n-tag type="success" size="small" round>
            {{ props.cardData.subcategory }}
          </n-tag>
        </n-space>
      </n-space>
    </div>
    <n-image width="100" :src="props.cardData.subcategory" />
  </router-link>
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
  cardData: () => null
})
</script>
