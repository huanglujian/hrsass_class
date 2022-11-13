import { login, getUserInfo, getUserDetailById } from '@/api/user'
import { getToken, removeToken, setToken, setTime } from '@/utils/auth'

export default {
  namespaced: true,
  state: {
    token: getToken(),
    userInfo: {} //! 这儿不能用 null 代替， null.没有的属性 会报错
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      if (token) { //! 有token 且 token不为空
        setToken(token)
      } else {
        removeToken()
      }
    },
    setUserInfo(state, userInfo) {
      state.userInfo = { ...userInfo }
    }
  },
  actions: {
    async userLogin(context, payload) {
      const data = await login(payload)
      context.commit('setToken', data)
      setTime()
    },
    async asyncGetUserInfo({ commit }) {
      const res = await getUserInfo()
      const res2 = await getUserDetailById(res.userId)
      commit('setUserInfo', { ...res, ...res2 })
    },
    logout({ commit }) {
      commit('setToken', null)
      commit('setUserInfo', {})
    }
  }
}
