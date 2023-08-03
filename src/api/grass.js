
// 种草
import request from '@/utils/request.js'

export const grassList = (data) => {
  return request({
    method: "POST",
    url: "/frontend/article/list",
    data
  })
}

// 添加文章 /frontend/article/add
export const addEssay = (data) => {
  return request({
    method: "POST",
    url: "/frontend/article/add",
    data
  })
}

// 获取文章详情 /frontend/article/detail/
export const essayInfo = (data) => {
  return request({
    method: "POST",
    url: "/frontend/article/detail/",
    data
  })
}
// 获取评论 /frontend/comment/add/
export const addComment = (data) => {
  return request({
    method: "POST",
    url: "/frontend/comment/add/",
    data
  })
}
// 文章点赞 /frontend/praise/add/
export const addLike = (data) => {
  return request({
    method: "POST",
    url: "/frontend/praise/add/",
    data
  })
}
// 取消文章点赞 /frontend/praise/delete/
export const delLike = (data) => {
  return request({
    method: "POST",
    url: "/frontend/praise/delete/",
    data
  })
}

// 文章收藏 collect /frontend/collection/add/
export const addCollect = (data) => {
  return request({
    method: "POST",
    url: "/frontend/collection/add/",
    data
  })
}
// 删除收藏  /frontend/collection/delete/

export const delCollect = (data) => {
  return request({
    method: "POST",
    url: "/frontend/collection/delete/",
    data
  })
}

// 我的文章 /frontend/article/my/list
export const myArticle = (data) => {
  return request({
    method: "POST",
    url: "/frontend/article/my/list",
    data
  })
}

// 删除文章  /frontend/article/delete
export const delArticle = (data) => {
  return request({
    method: "POST",
    url: "/frontend/article/delete",
    data
  })
}

// 删除恶臭评论 /frontend/comment/delete/
export const delComment = (data) => {
  return request({
    method: "POST",
    url: "/frontend/comment/delete/",
    data
  })
}