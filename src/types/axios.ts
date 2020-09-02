import { AxiosRequestConfig } from './request'
import { AxiosPromise, ResponseData } from './response'
import { InterceptorMethods } from '../types/interceptor'

export interface AxiosClass {
  interceptors: {
    request: InterceptorMethods<AxiosRequestConfig>
    response: InterceptorMethods<ResponseData>
  }

  request(config: AxiosRequestConfig): AxiosPromise

  get(url: string, config?: AxiosRequestConfig): AxiosPromise

  head(url: string, config?: AxiosRequestConfig): AxiosPromise

  options(url: string, config?: AxiosRequestConfig): AxiosPromise

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
}

export interface InstanceAxios extends AxiosClass {
  // 对应 axios(config)
  (config: AxiosRequestConfig): AxiosPromise
  // 对应 axios('/router', config)
  (url: string, config: AxiosRequestConfig): AxiosPromise
}
