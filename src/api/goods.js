// 商品详情
import request from '@/utils/request.js'

export const shopDetail = (data) => {
  return request({
    method: "POST",
    url: "/frontend/goods/detail",
    data
  })
}

// 购物车
export const car = (data) => {
  return request({
    method: "POST",
    url: "/frontend/cart/list/",
    data
  })
}
// 添加收藏
export const likeShop = (data) => {
  return request({
    method: "POST",
    url: "/frontend/collection/add/",
    data
  })
}
// 删除收藏
export const dislikeShop = (data) => {
  return request({
    method: "POST",
    url: "/frontend/collection/delete/",
    data
  })
}
// 添加购物车/frontend/cart/add/
export const addCar = (data) => {
  return request({
    method: "POST",
    url: "/frontend/cart/add/",
    data
  })
}
// 编辑购物车 /frontend/cart/update/
export const setCar = (data) => {
  return request({
    method: "POST",
    url: "/frontend/cart/update/",
    data
  })
}
// 删除购物车 /frontend/cart/delete/
export const delCar = (data) => {
  return request({
    method: "POST",
    url: "/frontend/cart/delete/",
    data
  })
}
// 收货地址 /frontend/consignee/list/
export const addresList = (data) => {
  return request({
    method: "POST",
    url: "/frontend/consignee/list/",
    data
  })
}
// 增加地址  /frontend/consignee/add/
export const addAddres = (data) => {
  return request({
    method: "POST",
    url: "/frontend/consignee/add/",
    data
  })
}

// 删除地址 /frontend/consignee/delete/
export const delAddres = (data) => {
  return request({
    method: "POST",
    url: "/frontend/consignee/delete/",
    data
  })
}

// 编辑 /frontend/consignee/update/
export const setAddres = (data) => {
  return request({
    method: "POST",
    url: "/frontend/consignee/update/",
    data
  })
}

// 购买商品 /frontend/order/add/
export const addOrder = (data) => {
  return request({
    method: "POST",
    url: "/frontend/order/add/",
    data
  })
}
