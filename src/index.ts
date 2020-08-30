// axios 库入口文件

import { AxiosRequestConfig } from './types/index'
import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'
import xhr from './xhr'

/**
 * 处理请求地址
 * @param config 请求配置
 */
function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

/**
 * 处理 data 参数（用于发送 post 请求时）
 * @param data 参数
 */
function transformRequestData(data: any): any {
  return transformRequest(data)
}

/**
 * 发送请求前处理请求配置
 * @param config 请求配置
 */
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.data = transformRequestData(config.data)
}

function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
}

export default axios
