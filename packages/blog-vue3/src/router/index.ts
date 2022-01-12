import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

export default () =>
  createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes: [
      {
        path: '/',
        name: 'Home',
        redirect: '/blog',
        component: () => import('@/views/home/index.vue')
      },
      {
        path: '/hello',
        name: 'HelloWorld',
        component: () => import('@/views/hello-world/index.vue')
      },
      {
        path: '/blog',
        name: 'Blog',
        component: () => import('@/views/blog/index.vue')
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/about/index.vue')
      },
      {
        path: '/article',
        name: 'Artical',
        component: () => import('@/views/article/index.vue')
      }
    ]
  })
