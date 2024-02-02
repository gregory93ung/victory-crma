import { api } from '@/config/api.config'

const URL = '/api/v1/Auth/login'

type LoginReq = { login: string; password: string }

type LoginResp = { token_name: 'string'; token_value: 'string' }

export const login = async (body: LoginReq): Promise<LoginResp> => {
  return await api.post(URL, body)
}
