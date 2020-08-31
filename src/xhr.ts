// 处理 axios 请求逻辑

import { axiosPromise, ResponseData } from './types/response'
import { AxiosRequestConfig } from './types/request'
import {parseHeaders} from './helpers/headers'

export default function xhr(config: AxiosRequestConfig): axiosPromise {
  return new Promise((resolve, reject) => {
    const { url, method = 'GET', data = null, headers, responseType, timeout } = config

    let request = new XMLHttpRequest()

    // 规定返回的数据类型
    if (responseType) {
      request.responseType = responseType
    }

    request.open(method.toLocaleUpperCase(), url) // 初始化一个请求

    // 设置超时时间
    if (timeout) {
      request.timeout = timeout
    }

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

    // 返回数据
    request.onreadystatechange = () => {
      // 请求操作处理完成（结果包括成功响应/失败）
      if (request.readyState === 4) {
        let { status } = request

        // XMLHttpRequest errors（触发 error/timeout 事件）
        if (status === 0) return

        // 响应成功
        if (status >= 200 && status < 300) {
          const res: ResponseData = {
            data: responseType === 'text' ? request.responseText : request.response,
            status: status,
            statusText: request.statusText,
            headers: parseHeaders(request.getAllResponseHeaders()),
            config,
            request
          }

          resolve(res)
        } else {
          // 响应失败
          reject(new Error(`Request failed with status code ${status}`))
        }
      }
    }

    /**
     * 错误处理（XMLHttpRequest errors）
     */
    // 网络错误
    request.onerror = () => {
      reject(new Error('Network Error'))
    }

    // 超时错误（请求发送后超过某个时间仍没有收到响应，触发该事件）
    request.ontimeout = () => {
      reject(new Error(`Timeout of ${timeout} ms exceeded`))
    }

    request.send(data) // 发送请求
  })
}
