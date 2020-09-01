import { AxiosRequestConfig } from './../types/request'
import { ResponseData } from './../types/response'
import { axiosPromise } from '../types/response'
import dispatchFetch from './dispatchFetch'
import { Methods } from '../types/request'
import { resolveFn, rejectFn, InterceptorMethods } from '../types/interceptor'

// promise 拦截器链
export interface promiseChain {
  resolved: resolveFn | ((config: AxiosRequestConfig) => axiosPromise)
  rejected?: rejectFn
}

export default class Axios {
  // 拦截器
  interceptors = {
    request: new InterceptorMethods<AxiosRequestConfig>(),
    response: new InterceptorMethods<ResponseData>()
  }

  request(url: any, config?: any): axiosPromise {
    // 适用于 axios('/router') 或者 axios('/router', config)
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }

      config.url = url
    } else {
      // 适用于 axios(config) 或者 axios.request(config)
      config = url
    }

    /**
     * 拦截器处理
     */
    // 将拦截器和发送请求方法组合到 promise 链中
    let promiseChain: promiseChain[] = [
      {
        resolved: dispatchFetch,
        rejected: undefined
      }
    ]

    // 将请求拦截器加入 promise链 中
    this.interceptors.request.interceptors.forEach(item => {
      if (item) {
        promiseChain.unshift(item)
      }
    })

    // 将响应拦截器加入 promise链 中
    this.interceptors.response.interceptors.forEach(item => {
      if (item) {
        promiseChain.push(item)
      }
    })

    // 按照顺序执行 promise 链上的拦截器及请求方法
    let promise = Promise.resolve(config)
    promiseChain.forEach((item: promiseChain) => {
      let { resolved, rejected } = item
      promise = promise.then(resolved, rejected)
    })

    return promise
  }

  // 适用于 get head options delete
  _requestWithoutData(url: string, method: Methods, config?: AxiosRequestConfig): axiosPromise {
    return this.request(
      Object.assign(config || {}, {
        url,
        method
      })
    )
  }

  // 适用于 post put patch
  _requestWithData(
    url: string,
    method: Methods,
    data?: any,
    config?: AxiosRequestConfig
  ): axiosPromise {
    return this.request(
      Object.assign(config || {}, {
        url,
        method,
        data
      })
    )
  }

  get(url: string, config?: AxiosRequestConfig): axiosPromise {
    return this._requestWithoutData(url, 'get', config)
  }

  head(url: string, config?: AxiosRequestConfig): axiosPromise {
    return this._requestWithoutData(url, 'head', config)
  }

  options(url: string, config?: AxiosRequestConfig): axiosPromise {
    return this._requestWithoutData(url, 'options', config)
  }

  delete(url: string, config?: AxiosRequestConfig): axiosPromise {
    return this._requestWithoutData(url, 'delete', config)
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): axiosPromise {
    return this._requestWithData(url, 'post', data, config)
  }

  put(url: string, data?: any, config?: AxiosRequestConfig): axiosPromise {
    return this._requestWithData(url, 'put', data, config)
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig): axiosPromise {
    return this._requestWithData(url, 'patch', data, config)
  }
}
