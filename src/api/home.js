import request from '@/utils/request.js'

// 轮播图
export const Carousel = (data) => {
  return request({
    method: "POST",
    url: "/frontend/rotation/list",
    data
  })
}

// 商品首页
export const Shop = (data) => {
  return request({
    method: "POST",
    url: "/frontend/goods/list",
    data
  })
}

// 我的收藏  /frontend/collection/list/
export const myCollect = (data) => {
  return request({
    method: "POST",
    url: "/frontend/collection/list/",
    data
  })
}
// 我的订单 /frontend/order/list/
export const myOrder = (data) => {
  return request({
    method: "POST",
    url: "/frontend/order/list/",
    data
  })
}
// 我的点赞 /frontend/praise/list/
export const myLike = (data) => {
  return request({
    method: "POST",
    url: "/frontend/praise/list/",
    data
  })
}

// 我的信息 /frontend/my/info/
export const myInfo = (data) => {
  return request({
    method: "POST",
    url: "/frontend/my/info/",
    data
  })
}

// 修改密码 /frontend/sso/password/update
export const editInfo = (data) => {
  return request({
    method: "POST",
    url: "/frontend/sso/password/update",
    data
  })
}

