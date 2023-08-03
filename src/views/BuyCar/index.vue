<template>
  <div class="car">
    <van-swipe-cell v-for="item in data" :key="item.id" v-if="!have">
      <lazy-component>
        <van-card :num="`${((item.goods_info?.price / 100) * item.count).toFixed(2)}元`"
          :price="(item.goods_info?.price / 100).toFixed(2)" :desc="item.goods_info?.detail_info"
          :thumb="item.goods_info?.pic_url" class="goods-card" :thumb-link="`/shop/${item.goods_id}`">
          <template #tags>
            <van-tag plain type="primary">{{ item.goods_info?.brand }}</van-tag>
          </template>
          <template #title>
            <p class="title">{{ item.goods_info?.name }}</p>
            <div class="checkbox">
              <van-checkbox v-model="item.checks" />
            </div>
          </template>
          <template #footer>
            <van-stepper v-model="item.count" theme="round" button-size="22" disable-input :step="1"
              @change="setNum(item)" />
          </template>
        </van-card>
      </lazy-component>
      <template #right>
        <van-button square type="danger" text="删除" class="delete-button" @click="del(item.id)" />
      </template>

    </van-swipe-cell>
    <div class="none" v-show="have">
      <h1>购物车空空如也</h1>
      <van-button type="primary" to="home">去首页购买想要的商品吧</van-button>
    </div>
    <van-submit-bar :price="sum" button-text="提交订单" @submit="onSubmit" v-show="!have">
      <van-checkbox v-model="checked" ref="dom">全选</van-checkbox>
    </van-submit-bar>
    <van-back-top right="5vw" bottom="10vh" />
  </div>
</template>
<script setup>
// 数据加密
import CryptoJS from 'crypto-js'
import { useRouter } from 'vue-router';
import { car, delCar, setCar } from '../../api/goods.js'
import { ref, computed } from 'vue';
import { carStore } from '../../stores/car.js'

const router = useRouter()
const store = carStore()
// 使用ref创建响应式数据
let data = ref([]);
let dom = ref(null)
let have = ref(true);
// 进行购物车的删除
const del = async (id) => {
  let res = await delCar({ ids: [id] });
  if (res.code == 1) {
    // 查看仓库有没有
    needCar();
  }
};

// 修改购物车
async function setNum(item) {
  await setCar({
    goods_id: item.goods_id,
    count: item.count,
    id: item.id
  });
}

// 获取购物车
async function needCar() {
  let res = await car({ page: 1, limit: 100 });
  if (res.data.count == 0) {
    have.value = true;
  }
  if (res.data.list) {
    res.data.list.forEach(item => {
      item.checks = false;
    });
    data.value = res.data.list; // 更新响应式数据
    have.value = false;
  }
  store.needCar();
}
needCar(); // 初始化时获取购物车数据

// 使用computed创建计算属性
// 准备一个控制全选的计算属性
const checked = computed({
  get: () => data.value.every((it) => it.checks),
  set: (val) => {
    data.value.forEach(it => {
      it.checks = val
    })
  }
})
let sum = computed(() => {
  let money = 0;
  data.value.forEach(item => {
    if (item.checks) {
      money += Number(item.count * item.goods_info.price);
    }
  });
  return money
});
// 购买商品
const onSubmit = () => {
  let buy = data.value.filter(item => item.checks)
  // 要传递数据
  // 在路由跳转时传递数据
  if (buy.length == 0) {
    return
  } else {
    buy.forEach(i => {
      i.orderId = i.goods_id
    })
    let obj = {
      sumPrice: sum.value,
      data: buy
    }
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(obj), 'secretKey').toString()
    router.replace({
      path: '/shop/addres', // 目标路由的路径
      query: {
        encryptedData
      }
    })
  }
};
</script>
<style scoped lang="scss">
::v-deep .van-card__num {
  color: #FF007F;
  font-size: 14px;
}

.goods-card {
  margin: 12px;
  background-color: white;
  padding-left: 40px;
  position: relative;
  box-sizing: border-box;
  --van-card-num-color: #FF007F;
  --van-card-num-font-size: 14px;
  --van-card-price-color: #FF4500;
  /* 使用 CSS 变量来自定义组件样式 */
}

.title {
  font-size: 14px;
}

.car {
  position: relative;
  font-size: 12px;

  .none {
    h1 {
      font-size: 20px;
      font-weight: 600;
      text-align: center;
    }

    padding: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .sum {
    margin: 5px;
    font-size: 14px;
    color: #FF007F;
  }

  .van-submit-bar {
    margin-bottom: 50px;
    /* 调整适当的底部外边距 */
  }

  .van-card__footer {
    display: flex;
  }
}

.checkbox {
  display: flex;
  justify-content: flex-end;
  position: absolute;
  top: 40px;
  left: -125px;
}

.delete-button {
  height: 100%;
}
</style>