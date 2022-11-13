import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
// import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/404']

//! 路由前置守卫
router.beforeEach(async(to, from, next) => {
  const token = store.getters.token
  if (token) { //! 如果有token
    if (to.path === '/login') { //! 就看看是不是login页面
      next('/') //! 是,就直接去首页
    } else {
      if (!store.getters.userId) {
        await store.dispatch('user/asyncGetUserInfo')
      }
      next() //! 不是，就直接跳转它要去的页面
    }
  } else { //! 没有token
    if (whiteList.includes(to.path)) { //! 就看看是不是在白名单
      next() //! 在，就直接走
    } else {
      next('/login') //! 不在就去login页面
    }
  }
})
