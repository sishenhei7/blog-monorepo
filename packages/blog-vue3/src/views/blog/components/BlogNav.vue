<template>
  <n-affix :top="120" :trigger-top="60">
    <div>专栏</div>
    <n-menu :options="menuOptions" />
  </n-affix>
</template>
<script lang="ts" setup>
import { h } from 'vue'
import { RouterLink } from 'vue-router'
import { NIcon } from 'naive-ui'
import IconGithub from '~icons/mdi/github'

const menuOptions = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'BlogHome'
          }
        },
        { default: () => '推荐' }
      ),
    key: 'blog-home',
    icon: () => h(NIcon, null, { default: () => h(IconGithub) })
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'BlogLife'
          }
        },
        { default: () => '生活' }
      ),
    key: 'blog-life',
    icon: () => h(NIcon, null, { default: () => h(IconGithub) })
  }
]
</script>
