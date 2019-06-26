const axios = require('axios')

// 创建一个错误
function errorCreate(err) {
  console.log('>>>>>> request Error >>>>>>')
  console.log(err)
  if (process.env.NODE_ENV === 'development') {
  }
}


// 创建一个 axios 实例
const service = axios.create({
  baseURL: 'http://hopper.php-dev.in/rest/V1',
  timeout: 1000 * 60,
  headers: {
    'content-type': 'application/json',// 默认值，
    'Authorization': 'Bearer zek2glksyljjumj2zwavuk715e31sgqf'
  }
})


// 请求拦截器
service.interceptors.request.use(
  config => {
    // config.baseURL += getBaseUrl(global.locale)
    return config
  },
  error => {
    // 发送失败
    errorCreate(error)
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const dataAxios = response.data
    return dataAxios
  },
  error => {
    let errorMessage = null
    if (!error.response) {
      errorMessage = {
        status: '500',
        data: {
          message: '服务器错误'
        }
      }
    } else {
      const { status, statusText, data } = error.response
      errorMessage = {
        status,
        statusText,
        data
      }
    }
    errorCreate(errorMessage.data)
    return Promise.reject(JSON.stringify(errorMessage))
  }
)

module.exports = service