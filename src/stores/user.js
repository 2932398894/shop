import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { getData } from '../utils/information.js'
import { getToken } from '../utils/auth.js'
// 把用户信息存储到仓库
export const useCounterStore = defineStore('user', () => {
  let user = reactive({
    name: '',
    password: '',
    sex: '',
    secret_answer: '',
    sign: '',
    avatar: '',
  })
  newUser()
  // 如果有token
  if (getToken()) {
    // 重新把东西放到仓库
    getData(user.name)
  }
  // 先重新赋值
  function newUser(info) {
    Object.assign(user, info);
  }
  // 重置
  function delUser() {
    user = reactive({})
  }
  return { user, delUser, newUser }
})