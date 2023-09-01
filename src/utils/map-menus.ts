import type { RouteRecordRaw } from 'vue-router'

function loadLocalRoutes() {
  const localRouters: RouteRecordRaw[] = []
  const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', {
    eager: true
  })

  for (const key in files) {
    const module = files[key]
    localRouters.push(module.default)
  }

  return localRouters
}

export let firstMenu: any = null
export function mapMenusToRouters(userMenus: any[]) {
  // 加载本地路由
  const localRouters = loadLocalRoutes()

  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRouters.find((item) => item.path === submenu.url)

      if (route) {
        // 顶层菜单重定向（只需要添加一次）
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }
        // 二级菜单对应路由
        routes.push(route)
      }

      if (!firstMenu && route) firstMenu = submenu
    }
  }

  return routes
}

interface IBreadcrumbs {
  name: string
  path: string
}

export function mapPathToBreadcrumbs(path: string, userMenus: any[]) {
  const breadcrumbs: IBreadcrumbs[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        breadcrumbs.push({ name: menu.name, path: menu.url })
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrumbs
}

/**
 * 更具路径去陪许需要显示的菜单
 * @param path 匹配的路径
 * @param userMenus 所有的菜单
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url == path) {
        return submenu
      }
    }
  }
}
