/**
 * 响应相关
 */

import { AxiosRequestConfig } from './request'

// 响应数据
export interface ResponseData {
  data: any // 服务端返回的数据
  status: number // 状态码
  statusText: string // 状态消息
  headers: any // 响应头
  config: AxiosRequestConfig // 请求配置对象
  request: any // XMLHttpRequest 对象实例
}

// axios 响应返回的 promise
export interface AxiosPromise extends Promise<ResponseData> {}
