import { AxiosRequestConfig } from '../types/request'
import { axiosPromise } from '../types/response'
import dispatchFetch from './dispatchFetch'
import { Methods } from '../types/request'

export default class Axios {
  request(config: AxiosRequestConfig): axiosPromise {
    return dispatchFetch(config)
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
