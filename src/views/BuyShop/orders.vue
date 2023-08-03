<template>
  <div class="addres">
    <div class="back" @click="go = true">
    </div>
    <van-address-list :list="list" :switchable="false" default-tag-text="默认" add-button-text="" />
    <van-card v-for="item in shop" :key="item.id" :num="item.count" :tag="item.goods_info.brand"
      :price="(item.goods_info.price / 100).toFixed(2)" :desc="item.goods_info.detail_info" :title="item.goods_info.name"
      :thumb="item.goods_info.pic_url" class="goods-card" />

    <van-submit-bar :price="price" button-text="提交订单" @submit="onSubmit">
      <van-cell arrow-up title="备注" @click="show = true" />
      <van-icon name="arrow-up" />
      <van-action-sheet v-model:show="show" title="请输入备注">
        <div class="content"> <van-field v-model="message" rows="2" autosize label="备注" type="textarea" maxlength="100"
            placeholder="请输入备注" show-word-limit /></div>
      </van-action-sheet>
    </van-submit-bar>
    <van-action-sheet v-model:show="buy" :actions="actions" cancel-text="取消" close-on-click-action @select="onSelect"
      @cancel="onCancel" />
    <van-dialog v-model:show="go" title="标题" show-cancel-button @confirm="back">
      <p style="text-align: center;margin: 15px;">是否取消购买商品</p>
    </van-dialog>
    <van-back-top right="5vw" bottom="10vh" />
  </div>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router';
import { addOrder } from '../../api/goods.js'
import { ref } from 'vue';
import { showToast, } from 'vant'
import { delCar } from '../../api/goods.js';
// 数据加密
import CryptoJS from 'crypto-js'

const list = ref([]);
const route = useRoute();
const router = useRouter()
const goods = route.query.goods ? route.query.goods : ''
const shop = ref([])
const show = ref(false)
let buy = ref(false)
const go = ref(false)
let price = ref(0)
const actions = [
  { name: '微信', pay_type: 1 },
  { name: '支付宝', pay_type: 2 },
  { name: '云闪付', pay_type: 3 },
];
let message = ref('')
let bytes;
let goodInfo;
if (route.query.goods) {
  // 解密数据
  bytes = CryptoJS.AES.decrypt(goods, 'secretKey')
  goodInfo = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  list.value.push(goodInfo.item)
  shop.value = goodInfo.shopInfo.data
  price.value = goodInfo.shopInfo.sumPrice
}
// 取消支付
const onCancel = async () => {
  let goods = shop.value.map(item => ({
    goods_id: item.orderId,
    count: item.count
  }))
  let res = await addOrder({
    pay_type: 0,
    remark: message.value,
    status: 1,
    price: price.value,
    order_goods_infos: goods
  })
  if (res.code == 1) {
    showToast('取消支付');
    // 跳到订单页面
    router.replace({
      path: '/my/order', // 目标路由的路径
    })
    message.value = ''
  }
};

// 选择支付方式
async function onSelect(option) {
  let goods = shop.value.map(item => ({
    goods_id: item.orderId,
    count: item.count,
    flag: item.checks,
    id: item.id
  }))
  let ids = goods.map(item => item.id)
  let res = await addOrder({
    pay_type: option.pay_type,
    remark: message.value,
    status: 2,
    price: price.value,
    order_goods_infos: goods
  })
  if (res.code == 1) {
    showToast('购买成功');
    // 跳到订单页面
    router.replace({
      path: '/my/order', // 目标路由的路径
    })
    message.value = ''
    if (goods.some(item => item.flag === true)) {
    await delCar({ ids });
  }
  }
}
// 打开支付方式
let onSubmit = () => {
  buy.value = true
}
// 返回
function back() {
  history.back();
}
</script>
<style scoped lang="scss">
::v-deep .van-address-item__edit {
  display: none;
}

::v-deep .van-cell {
  margin-left: 30px;
  width: unset;
}

::v-deep .van-card__num {
  font-size: 14px;
}

::v-deep .van-address-list__bottom {
  display: none;
}

.addres {
  position: relative;
  --van-address-list-padding: 25px;
  --van-action-sheet-cancel-text-color: red;
  font-size: 12px;

  .back {
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 2;
    height: 50px;
    width: 80px;
  }

  .content {
    padding: 16px 16px 100px;
  }

  .van-cell {
    margin-left: 25px;
    padding: 0;
  }

  .goods-card {
    margin: 40px 0;
    background-color: white;
    --van-card-num-color: #FF007F;
    --van-card-num-font-size: 14px;
    --van-card-price-color: #FF4500;
  }


  .border {
    position: absolute;
    right: 0;
    left: 10px;
    bottom: 140px;
    height: 2px;
    background: repeating-linear-gradient(-45deg, var(--van-warning-color) 0, var(--van-warning-color) 20%, transparent 0, transparent 25%, var(--van-primary-color) 0, var(--van-primary-color) 45%, transparent 0, transparent 50%);
    background-size: 80px;
    width: 351px;
  }
}
</style>