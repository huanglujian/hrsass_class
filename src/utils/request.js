import axios from 'axios'
// import { MessageBox, Message } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'
// import { config } from '@vue/test-utils'

//! 创建一个axios的实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, //!  VUE_APP_BASE_API 这个变量在 .env.development 文件中声明过
  timeout: 5000 //! 请求超时
})

//! 请求拦截器
service.interceptors.request.use(
  config => {
    return config
  }
)

//! 响应拦截器
service.interceptors.response.use(
  response => {
    const { res } = response
    return res
  }
)

export default service
