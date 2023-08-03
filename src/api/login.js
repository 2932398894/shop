import request from '@/utils/request.js'

// 登录
export const Login = (data) => {
  return request({
    method: "POST",
    url: "/frontend/sso/login",
    data
  })
}

// 注册
export const add = (data) => {
  return request({
    method: "POST",
    url: "/frontend/sso/register",
    data
  })
}
