import type { AccoutResult, IAccount } from '@/views/login/types'
import hyRequest from '..'

export function accoutLoginRequest(account: IAccount) {
  return hyRequest.post<AccoutResult>({
    url: '/keyauth/api/v1/token/issue',
    data: account
  })
}

export function getUserMenusByUserId(id: string) {
  return hyRequest.get<any>({
    url: `/keyauth/api/v1/menu`,
    params: { id: id }
  })
}
