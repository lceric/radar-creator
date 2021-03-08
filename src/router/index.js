import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/home',
    component: () => import('@/views/home/entry.vue'),
  },
  {
    path: '/',
    redirect: '/home',
  },
]
export default createRouter({
  history: createWebHashHistory(),
  routes,
})
