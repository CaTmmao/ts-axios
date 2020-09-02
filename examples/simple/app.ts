import axios from '../../src/index'

axios.interceptors.request.use(config => {
  config.headers.test += '11'
  return config
})

axios.interceptors.response.use(response =>{
  response.data = 'tesat'
  return response
})

axios({
  method: 'get',
  url: '/simple/get',
  params: {
    a: 1,
    b: 2
  },
  headers: {
    test: '2'
  }
}).then(res => {
  console.log(res)
})
