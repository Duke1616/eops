import { defineStore } from 'pinia'
import { accoutLoginRequest, getUserMenusByUserId } from '@/service/login/login'
import type { IAccount } from '@/views/login/types'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN, USERNAME } from '@/global/constants'
import router from '@/router'
import { mapMenusToRouters } from '@/utils/map-menus'

interface ILoginState {
  token: string
  username: string
  userMenus: any
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    username: localCache.getCache(USERNAME) ?? '',
    userMenus: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      const loginResult = await accoutLoginRequest(account)
      // 获取token
      const id = loginResult.data.user_id
      this.token = loginResult.data.access_token
      this.username = loginResult.data.user_id

      // 进行本地缓存
      localCache.setCache(LOGIN_TOKEN, this.token)
      localCache.setCache(USERNAME, this.username)

      // 根据用户角色信息，获取菜单menus
      const userMenusResult = await getUserMenusByUserId(id)
      const userMenus = userMenusResult.data.items
      this.userMenus = userMenus

      // 进行本地缓存
      localCache.setCache('userMenus', userMenus)

      console.log(userMenus)

      // 动态添加路由
      const routes = mapMenusToRouters(userMenus)
      console.log(routes)
      routes.forEach((route) => router.addRoute('main', route))

      // 页面跳转
      router.push('/main')
    },
    loadLocalCacheAction() {
      const token = localCache.getCache(LOGIN_TOKEN)
      const userMenus = localCache.getCache('userMenus')
      const username = localCache.getCache(USERNAME)
      if (token && userMenus && username) {
        this.token = token
        this.userMenus = userMenus
        this.username = username

        // 动态添加路由
        const routes = mapMenusToRouters(userMenus)

        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore
