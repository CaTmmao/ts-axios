/**
 * 处理请求头的辅助函数
 */

import { isPlainObject } from '../helpers/util'

/**
 * 规范请求头名称（规范大小写）
 * @param headers 请求头对象
 * @param normalizeName 要规范的请求头名称 （如： content-type 改为 Content-Type，这里传入 Content-Type）
 */
function normalizeHeaderName(headers: any, normalizeName: string): void {
  if (headers) {
    Object.keys(headers).forEach(key => {
      if (key !== normalizeName && key.toUpperCase() === normalizeName.toUpperCase()) {
        headers[normalizeName] = headers[key]
        delete headers[key]
      }
    })
  }
}

/**
 * 处理请求头
 * @param headers 请求头
 * @param data 发送 post 请求时传入的请求体
 */
export function processHeaders(headers: any, data: any): void {
  /**
   * 如果发送 post 请求时传入的请求体是对象，那么需要把 Content-Type 改为 application/json，否则服务端无法接收到
   */
  // 先规范化请求头名称便于后续查找
  normalizeHeaderName(headers, 'Content-Type')
  // 传入的 data 参数是对象，同时客服端未设置 Content-Type，那就我设置
  if (isPlainObject(data) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json;charset=utf-8'
  }
}
