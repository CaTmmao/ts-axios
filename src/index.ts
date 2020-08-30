// axios 库入口文件

import { AxiosRequestConfig } from './types/index'
import { processURL } from './helpers/url'
import { processRequestData } from './helpers/data'
import { processHeaders } from './helpers/headers'
import xhr from './xhr'

/**
 * 发送请求前处理请求配置
 * @param config 请求配置
 */
function processConfig(config: AxiosRequestConfig): void {
  let { url, data, params, headers = {} } = config
  config.url = processURL(url, params)
  processHeaders(headers, data)
  config.data = processRequestData(data)
}

function axios(config: AxiosRequestConfig): void {
  // 发送请求前处理请求配置
  processConfig(config)
  // 发送请求
  xhr(config)
}

export default axios
