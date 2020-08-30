/**
 * 通用辅助函数
 */

const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

/**
 * 判断是否是对象（包括 formdata、数组等）
 */
export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}

/**
 * 判断是否是普通对象（仅代表 {a:1} 这样的普通对象）
 */
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}
