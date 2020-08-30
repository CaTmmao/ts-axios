/**
 * 处理请求方法为 post 时的参数 data
 */

import { isPlainObject } from './util'

/**
 * 处理发送 post 请求时的 data 参数
 * （axios 库使用 XMLHttpRequest.send() 方法发送请求，该方法接受一个 body 参数，
 * 该参数的值可以是 Blob,BufferSource, FormData, URLSearchParams, or USVString object, 因此不接受客户端传来的普通对象，如 {a:1}
 * 需要把对象转换成 json 字符串才可以，json 字符串就是上面支持的 USVString）
 * @param data 请求参数 data
 */
export function transformRequest(data: any): any {
  // 是普通对象 如 {a:1}
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }

  return data
}
