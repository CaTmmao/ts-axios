/**
 * 存放 axios url 相关的辅助函数
 */

import { isDate, isObject } from './util'

function encode(val: string): string {
  return encodeURIComponent(val)
}

/**
 * 将请求地址和请求参数拼接成新的请求地址
 * @param url 请求地址  （如:http://localhost:8080/simple/get）
 * @param params 发送 get 请求时传入的参数  （如: params: {pwd:22,name:catmmao}）
 * @returns url 拼接后的请求地址  （如: http://localhost:8080/simple/get?pwd=22&name=catmmao）
 */
export function buildURL(url: string, params?: any): string {
  // 没传参数原样返回 url
  if (!params) return url

  // （如: ['name=catmmao','key=test'] ）
  let parts: string[] = []

  Object.keys(params).forEach(key => {
    let val = params[key]

    // 如果值是 null/undefined，不把该属性拼接到 url 中
    if (val === null || typeof val === 'undefined') return

    let values = []

    if (Array.isArray(val)) {
      key += '[]'
      values = val
    } else {
      values = [val]
    }

    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isObject(val)) {
        val = JSON.stringify(val)
      }

      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serilizedParams = parts.join('&')

  if (serilizedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serilizedParams
  }

  return url
}
