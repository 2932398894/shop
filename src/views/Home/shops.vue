<template>
  <div class="shop">
    <div class="good">
      <img :src="data.pic_url" alt="">
      <h3 class="price">{{ (data.price / 100).toFixed(2) }} ￥</h3>
      <p class="name">{{ data.name }}</p>
      <div class="num">
        <p> 品牌商：<span>{{ data.brand }}</span></p>
        <p class="stock">
        <div>库存：<span>{{ data.stock }} 件</span></div><span>免邮费 顺丰快递</span></p>
      </div>
      <div class="desc">
        <h2>商品描述</h2>
        <p class="conter">{{ data.detail_info }}</p>
      </div>
    </div>
    <van-action-bar>
      <van-action-bar-icon icon="cart-o" text="购物车" :badge="carStore().num ? carStore().num : ''" @click="onClickIcon" />
      <van-action-bar-icon color="#ffd21e" :icon="star ? 'star' : 'star-o'" text="收藏" v-model="star" @click="like" />
      <van-action-bar-button type="warning" text="加入购物车" @click="add" />
      <van-action-bar-button type="danger" text="立即购买" @click="onClickButton" />
    </van-action-bar>
    <van-back-top right="5vw" bottom="10vh" />
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { shopDetail, likeShop, dislikeShop, addCar, car, setCar } from '../../api/goods.js'
import { showToast } from 'vant';
import { carStore } from '../../stores/car.js'
// 数据加密
import CryptoJS from 'crypto-js'

const route = useRoute();
const router = useRouter()
let star = ref(false)
// 查看仓库有没有
carStore().needCar()

const shopId = route.params.shopId;
let data = reactive({})
async function needshop() {
  let res = await shopDetail({ id: shopId })
  Object.assign(data, res.data)
  star.value = res.data.is_collect
}
needshop()
const onClickIcon = () => {
  router.replace('/car')
};
// 收藏
async function like() {
  if (star.value) {
    let res = await dislikeShop({
      type: 1,
      object_id: shopId
    })
    if (res.code == 1) {
      showToast('删除收藏成功');
      star.value = false
    }
  } else {
    let res = await likeShop({
      type: 1,
      object_id: shopId
    })
    if (res.code == 1) {
      showToast('添加收藏成功');
      star.value = true
    }
  }
}
// 加入购物车
async function add() {
  // 获取购物车
  let know = await car({
    page: 1, limit: 100
  })
  let carData = (know.data.list || []).find(item => item.goods_id == shopId)
  if (carData) {
    await setCar({
      goods_id: shopId,
      count: carData.count + 1,
      id: carData.id
    })
  } else {
    // 如果没有
    await addCar({
      goods_id: shopId,
      count: 1
    })
  }
  carStore().needCar()
}
// 去购买
const onClickButton = () => {
  // 要传递数据
  // 在路由跳转时传递数据
  let goods={
    count:1,
    goods_info:data,
    id:data.id,
    orderId:data.id
  }
  let arr = []
  arr.push(goods)
  let obj = {
    sumPrice: data.price,
    data: arr
  }
  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(obj), 'secretKey').toString()
  router.replace({
    path: '/shop/addres', // 目标路由的路径
    query: {
      encryptedData
    }
  })
};
</script>
<style scoped lang="scss">
.shop {
  box-sizing: border-box;
  padding: 10px;
  font-size: 12px;

  .good {
    background: white;
    padding: 6px;
    box-sizing: border-box;

    img {
      width: 100%;
    }

    .name {
      font-size: 20px;
    }

    .stock {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .desc {
      h2 {
        font-weight: 700;
        font-size: 18px;
        color: #000;
        text-align: center;
      }

      .conter {
        padding: 0 20px;
        font-size: 14px;
        color: #545454;
      }
    }

    .num {
      color: #999;
      margin: 6px 0;
      font-size: 14px;
    }

    h3 {
      padding: 0 7px;
      color: #f63515;
      font-size: 20px;
      margin: 3px auto;
    }
  }
}
</style>