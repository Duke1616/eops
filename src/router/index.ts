import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'
import { createRouter, createWebHashHistory } from 'vue-router'
import { LOGIN_TOKEN } from '@/global/constants'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('../views/login/login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/main/main.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/not-found.vue')
    }
  ]
})

// 导航守卫
// router.beforeEach((to) => {
//   const token = localCache.getCache(LOGIN_TOKEN)
//   if (to.path === '/main' && !token) {
//     return '/login'
//   }
// })

// 导航守卫
router.beforeEach((to) => {
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path !== '/login' && !token) {
    return '/login'
  }

  if (to.path === '/main') {
    return firstMenu.url
  }
})

export default router
