// axios 库入口文件

import Axios from './core/axios'
import { extend } from './helpers/util'

let axios = new Axios()
let instance = axios.request.bind(axios)
extend(instance, axios)

export default instance
export { AxiosRequestError } from './types/error'
