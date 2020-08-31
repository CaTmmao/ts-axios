import { AxiosRequestConfig } from './request'
import { axiosPromise } from './response'

export interface AxiosClass {
  request(config: AxiosRequestConfig): axiosPromise

  get(url: string, config?: AxiosRequestConfig): axiosPromise

  head(url: string, config?: AxiosRequestConfig): axiosPromise

  options(url: string, config?: AxiosRequestConfig): axiosPromise

  delete(url: string, config?: AxiosRequestConfig): axiosPromise

  post(url: string, data?: any, config?: AxiosRequestConfig): axiosPromise

  put(url: string, data?: any, config?: AxiosRequestConfig): axiosPromise

  patch(url: string, data?: any, config?: AxiosRequestConfig): axiosPromise
}

export interface InstanceAxios extends AxiosClass {
  // 对应 axios(config)
  (config: AxiosRequestConfig): axiosPromise
  // 对应 axios('/router', config)
  (url: string, config: AxiosRequestConfig): axiosPromise
}
