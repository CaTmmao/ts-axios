// 处理 axios 请求逻辑

import { axiosPromise, ResponseData } from './types/response'
import { AxiosRequestConfig } from './types/request'
import {parseHeaders} from './helpers/headers'

export default function xhr(config: AxiosRequestConfig): axiosPromise {
  return new Promise(resolve => {
    const { url, method = 'GET', data = null, headers, responseType } = config

    let request = new XMLHttpRequest()

    // 规定返回的数据类型
    if (responseType) {
      request.responseType = responseType
    }

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

    // 返回数据
    request.onreadystatechange = () => {
      // 请求完毕
      if (request.readyState === 4) {
        const res: ResponseData = {
          data: responseType === 'text' ? request.responseText : request.response,
          status: request.status,
          statusText: request.statusText,
          headers: parseHeaders(request.getAllResponseHeaders()),
          config,
          request
        }

        resolve(res)
      }
    }

    request.send(data) // 发送请求
  })
}
