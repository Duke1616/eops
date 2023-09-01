export interface IAccount {
  username: string
  password: string
  grant_type: string
}

export interface AccoutResult {
  user_id: string
  access_token: string
}
