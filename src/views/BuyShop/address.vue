<template>
  <van-address-list v-model="chosenAddressId" :list="list" default-tag-text="默认" show-set-default @select="orders"
    @add="onAdd" @edit="onEdit" />
  <van-empty description="还没有收货地址" v-show="Boolean(!list)" />
  <van-back-top right="5vw" bottom="10vh" />
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import { addresList } from '../../api/goods.js'
// 数据加密
import CryptoJS from 'crypto-js'

const route = useRoute();
const router = useRouter()
const encryptedData = route.query.encryptedData ? route.query.encryptedData : ''
let bytes;
let shopInfo;
if (route.query.encryptedData) {
  // 解密数据
  bytes = CryptoJS.AES.decrypt(encryptedData, 'secretKey')
  shopInfo = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
}
const chosenAddressId = ref('1');
const list = ref([])

async function lists() {
  let res = await addresList({ page: 1, limit: 100 })
  // console.log(res);
  if (res.code == 1) {
    res.data.list.forEach(item => {
      item.tel = item.phone
      item.isDefault = Boolean(item.is_default)
      item.address = `${item.province}${item.city}${item.town}${item.street} ${item.detail}`
    })
    chosenAddressId.value = res.data.list.find(item => item.is_default).id
    list.value = res.data.list
  }
}
lists()
// 进行添加地址
const onAdd = () => {
  router.replace({
    path: '/shop/addres-set', // 目标路由的路径
  })
};
// 进行编辑
const onEdit = (item, index) => {
  // console.log(2);
  const data = {
    item,
    index
  }
  const know = CryptoJS.AES.encrypt(JSON.stringify(data), 'secretKey').toString()
  router.replace({
    path: '/shop/addres-set', // 目标路由的路径
    query: {
      know
    }
  })
};
function orders(item) {
  // 现在要传递数据了
  if (shopInfo) {
    let goods = CryptoJS.AES.encrypt(JSON.stringify({ shopInfo, item }), 'secretKey').toString()
    router.replace({
      path: '/shop/orders', // 目标路由的路径
      query: {
        goods
      }
    })
  }
}
</script>