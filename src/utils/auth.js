import Cookies from 'js-cookie'

const TokenKey = 'userToken'

// 得到
export function getToken() {
  return Cookies.get(TokenKey)
}

// 设置
export function setToken(token,times) {
  return Cookies.set(TokenKey, token,{
    // 这是token过期时间
    expires:new Date(Date.now()+times*1000)
  })
}
// 删除
export function removeToken() {
  return Cookies.remove(TokenKey)
}
