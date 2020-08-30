// 处理 axios 请求逻辑

import { AxiosRequestConfig } from './types/request'
export default function xhr(config: AxiosRequestConfig): void {
  const { url, method = 'GET', data = null, headers } = config

  let request = new XMLHttpRequest()

  request.open(method.toLocaleUpperCase(), url) // 初始化一个请求

  // 设置请求头
  if (headers) {
    Object.keys(headers).forEach(name => {
      // 没有请求体，就不设置 content-type
      if (!data && name.toLowerCase() === 'content-type') {
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
  }

  request.send(data) // 发送请求
}
