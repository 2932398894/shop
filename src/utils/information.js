
// 进行用户信息存储
const keyword = 'Tesco-user'
// 设置数据
export function setData(value) {
  // 这里key是用户名
  localStorage.setItem(keyword, btoa(encodeURI(JSON.stringify(value || []))))
}
// 获取数据
export function getData() {
  return JSON.parse(decodeURI(atob(localStorage.getItem(keyword) || '') || '') || '[]')
}

// 删除数据
export function removeData() {
  localStorage.removeItem(keyword)
}