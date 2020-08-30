// axios 库入口文件

import { AxiosRequestConfig } from './types/index'
import { buildURL } from './helpers/url'
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
 * 发送请求前处理请求配置
 * @param config 请求配置
 */
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
}

function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
}

export default axios
