import { defineStore } from 'pinia'

import { watchPodLogRequest, getPodLogRequest } from '@/service/pod/watch'
const useContainerStore = defineStore('container', {
  state: (): any => ({
    logs: {
      data: '',
      isLoading: true
    },
    watchHandler: null
  }),
  actions: {
    async watchLogs({ silent, ...params }: any, callback: () => void) {
      if (!silent) {
        this.logs.isLoading = true
      }

      if (!params.follow) {
        this.watchHandler = watchPodLogRequest('', {}, (data: any) => {
          this.logs = {
            data,
            isLoading: false
          }
          callback()
        })
      } else {
        const result = await getPodLogRequest({ params })

        this.logs = {
          data: result.data,
          isLoading: false
        }

        callback()
      }
    },

    stopWatchLogs() {
      this.watchHandler && this.watchHandler.abort()
    }
  }
})

export default useContainerStore
