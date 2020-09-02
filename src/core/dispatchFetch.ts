import { AxiosPromise } from '../types/response'
import { AxiosRequestConfig } from '../types/request'
import { processURL } from '../helpers/url'
import { processRequestData } from '../helpers/data'
import { processHeaders } from '../helpers/headers'
import xhr from '../xhr'

/**
 * 发送请求前处理请求配置
 * @param config 请求配置
 */
function processConfig(config: AxiosRequestConfig): void {
  let { url, data, params, headers = {} } = config
  config.url = processURL(url!, params)
  config.headers = processHeaders(headers, data)
  config.data = processRequestData(data)
}

function dispatchFetch(config: AxiosRequestConfig): AxiosPromise {
  // 发送请求前处理请求配置
  processConfig(config)
  // 发送请求
  return xhr(config)
}

export default dispatchFetch