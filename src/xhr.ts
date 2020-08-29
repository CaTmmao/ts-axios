// 处理 axios 请求逻辑

import { AxiosRequestConfig } from './types/index'
export default function xhr(config: AxiosRequestConfig): void {
  const { url, method = 'GET', data = null } = config

  let xhr = new XMLHttpRequest()

  xhr.open(method.toLocaleUpperCase(), url) // 初始化一个请求
  xhr.send(data) // 发送请求
}
