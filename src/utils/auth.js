import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

const TimeKey = 'vue_admin_time_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
export function getTime() {
  return Cookies.get(TimeKey)
}

export function setTime() {
  return Cookies.set(TimeKey, +new Date())
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
