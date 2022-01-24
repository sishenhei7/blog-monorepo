<template>
  <div class="space-y-12px">
    <router-link :to="{ path: '/about' }" class="text-sky-300 text-2xl">
      专栏
    </router-link>
    <router-link
      v-for="item in navData"
      :key="item.name"
      :to="{ path: item.path }"
      class="flex items-center"
    >
      <IconGithub />
      <span>{{ item.name }}</span>
    </router-link>
  </div>
</template>
<script lang="ts" setup>
import { h } from 'vue'
import { RouterLink } from 'vue-router'
import { NIcon } from 'naive-ui'
import IconGithub from '~icons/mdi/github'

const navData = [
  {
    name: '推荐',
    path: '/about'
  },
  {
    name: '生活',
    path: '/about'
  }
]
</script>
