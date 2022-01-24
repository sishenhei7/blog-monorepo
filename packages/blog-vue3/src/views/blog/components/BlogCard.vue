<template>
  <router-link
    v-if="cardData"
    :to="{ path: props.cardData.link }"
    target="_blank"
    class="group flex"
  >
    <div class="flex-1 pr-20px">
      <n-space vertical>
        <h4 class="text-2xl line-clamp-1 group-hover:text-sky-400">
          {{ props.cardData.title }}
        </h4>
        <p v-if="props.cardData.subtitle" class="text-base line-clamp-1">
          {{ props.cardData.subtitle }}
        </p>
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
