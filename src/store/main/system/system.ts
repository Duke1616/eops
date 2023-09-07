import { getUserList } from '@/service/main/system/system'
import { defineStore } from 'pinia'

interface ISystemState {
  usersList: any[]
  usersTotalCount: number
}

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0
  }),
  actions: {
    async getUserListAction(queryInfo?: {}) {
      const usersListResult = await getUserList(queryInfo)
      const userData = usersListResult.data
      this.usersTotalCount = userData.total
      this.usersList = userData.items
    }
  }
})

export default useSystemStore
