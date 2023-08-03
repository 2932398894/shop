import { ref } from 'vue'
import { defineStore } from 'pinia'
import { car } from '../api/goods.js'
export const carStore = defineStore('car', () => {
  let cars = ref([])
  //  获取购物车的数量
  let num = ref(0)
  async function needCar() {
    let res = await car({ page: 1, limit: 100 })
    cars.value = res.data.list
    num.value = res.data.count
  }
  function react() {
    num.value = 0
    cars.value=[]
  }
  return { cars, needCar, num, react }
})
