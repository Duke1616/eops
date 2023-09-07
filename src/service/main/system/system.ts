import hyRequest from '@/service'

export function getUserList(info?: {}) {
  return hyRequest.get<any>({
    url: `/ekube/api/v1/user`,
    params: info
  })
}
