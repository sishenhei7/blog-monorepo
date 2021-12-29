<template>
  <h1>blog framework</h1>
  <img alt="Vue logo" src="./assets/logo.png" />
  <RouterView />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App'
})
</script>

<style lang="scss" scoped>
@import '@/styles/variable.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h1 {
  font-weight: bold;
  font-size: 60px;
  color: $--color-primary;
  margin-bottom: 40px;
}
</style>
