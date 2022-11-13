import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getTime } from '@/utils/auth'
import router from '@/router'
// import { config } from '@vue/test-utils'

//! 创建一个axios的实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, //!  VUE_APP_BASE_API 这个变量在 .env.development 文件中声明过
  timeout: 5000 //! 请求超时
})

//! 判断是否token超时
function isTokenTimeout() {
  const nowTime = +new Date()
  const TimeSave = getTime()
  return nowTime - TimeSave > 1000 * 60 * 60 * 8
}

//! 请求拦截器
service.interceptors.request.use(
  config => {
    //! 有token就将token放到请求头
    const token = store.getters.token
    if (token) {
      if (isTokenTimeout()) {
        store.dispatch('user/logout')
        router.push('/login') //! 跳转到 login
        Message.error('token失效')
        return Promise.reject(new Error('token失效'))
      }
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  }, error => {
    return Promise.reject(error)
  })

//! 响应拦截器
service.interceptors.response.use(
  response => {
    const { data, success, message } = response.data
    if (success) {
      return data
    } else {
      Message.error(message)
      return Promise.reject(new Error(message))
    }
  },
  error => {
    if (error?.response?.data?.code === 10002) {
      store.dispatch('user/logout')
      router.push('/login') //! 跳转到 login
    } else {
      Message.error(error)
    }
    return Promise.reject(error)
  }
)

export default service
