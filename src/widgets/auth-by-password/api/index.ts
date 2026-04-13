import { axiosInstance } from '@/shared/lib'
import { DTO } from '../types'

export async function login(data: DTO.Request.Login): Promise<DTO.Response.Login> {
  const res = await axiosInstance.post<DTO.Response.Login>('/auth/login', data)
  return res.data
}