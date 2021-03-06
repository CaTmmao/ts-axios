/**
 * 发送请求相关接口
 */

// 请求方法
export type Methods =
  | 'get'
  | 'post'
  | 'put'
  | 'delete'
  | 'patch'
  | 'head'
  | 'options'
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'HEAD'
  | 'OPTIONS'
  | 'DELETE'

// 请求发送的配置
export interface AxiosRequestConfig {
  url?: string // 请求地址
  method?: Methods // 请求方法，默认为 get
  params?: any // 参数，请求方法为 get 时使用
  data?: any // 参数，请求方法为 post 时使用
  headers?: any // 请求头
  responseType?: XMLHttpRequestResponseType // 要求服务端返回的数据类型
  timeout?: number // 请求超时时间（毫秒）
}
