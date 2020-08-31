import { AxiosRequestConfig } from '../types/request'
import { ResponseData } from '../types/response'

/**
 * axios 请求错误接口
 */
export interface AxiosRequestError {
  message: string
  request: any
  config: AxiosRequestConfig
  response?: ResponseData
}
