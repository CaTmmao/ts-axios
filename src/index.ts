// axios 库入口文件

import Axios from './core/axios'
import { extend } from './helpers/util'
import { AxiosClass, InstanceAxios } from './types/axios'

let axios: AxiosClass = new Axios()
let anonymous = axios.request.bind(axios)
let instance: InstanceAxios = extend(anonymous, axios)

export default instance
export { AxiosRequestError } from './types/error'
