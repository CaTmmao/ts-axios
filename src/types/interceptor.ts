// 拦截器 resolve 参数接口
export interface resolveFn<T = any> {
  (val: T): T
}

// 拦截器 reject 参数接口
export interface rejectFn {
  (err: any): any
}

// 拦截器方法（同时适用于 请求拦截器&响应拦截器）
export class InterceptorMethods<T> {
  // 拦截器数组（存放多个拦截器）
  interceptors: ({ resolved: resolveFn<T>; rejected?: rejectFn } | null)[] = []

  // 添加拦截器
  use(resolved: resolveFn<T>, rejected?: rejectFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })

    // 返回拦截器 id，后续可根据 id 删除该拦截器
    return this.interceptors.length - 1
  }

  // 删除拦截器
  eject(id: number): void {
    this.interceptors[id] = null
  }
}
