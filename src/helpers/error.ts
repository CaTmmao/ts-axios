import { AxiosRequestConfig } from '../types/request'
import { ResponseData } from '../types/response'

/**
 * 请求错误类
 */
export class AxiosError extends Error {
  message: string // 错误信息
  request: any // XMLHttpRequest 实例
  config: AxiosRequestConfig // 请求配置
  response?: ResponseData // 响应数据

  constructor(message: string, request: any, config: AxiosRequestConfig, response?: ResponseData) {
    super(message)

    this.message = message
    this.request = request
    this.config = config
    this.response = response

    // TS 的一个bug，如果继承 Error，需要写这个
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

// 创建错误实例
export function createAxiosError(
  message: string,
  request: any,
  config: AxiosRequestConfig,
  response?: ResponseData
) {
  return new AxiosError(message, request, config, response)
}
