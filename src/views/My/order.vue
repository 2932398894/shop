<template>
  <div class="order">
    <van-tabs v-model:active="active" swipeable>
        <van-tab v-for="item in orders">
          <template #title> <van-icon :name="item.icon" size="16px" /> {{ item.title }}</template>
          <lazy-component>
          <div class="buy" v-for="i in item.data" :key="i.id">
            <div class="head">
              <p>订单号：{{ i.number }}</p>
              <p class="status">订单状态：<span :class="{
                'status-pending': i.buy === '待支付',
                'status-shipping': i.buy === '待发货', 'status-receiving': i.buy === '待收货',
                'status-evaluating': i.buy === '待评价'
              }">
                  {{ i.buy }}</span></p>
              <p class="time">购买时间：{{ i.created_at }}</p>
            </div>

            <van-card v-for="key in i.order_goods_infos" :price="(key.goods_info?.price / 100).toFixed(2)"
              :desc="key.goods_info?.detail_info" :thumb="key.goods_info?.pic_url" 
              :thumb-link="`/shop/${key.goods_id}`"
              class="goods-card">
              <template #tags>
                <van-tag plain type="primary">{{ key.goods_info?.brand }}</van-tag>
              </template>
              <template #num>
                <p class="money">{{ `${((key.goods_info?.price / 100) * key.count).toFixed(2)}元` }}</p>
              </template>
              <template #title>
                <p class="title">{{ key.goods_info?.name }}</p>
              </template>
            </van-card>

            <div class="footer">
              <p>备注：{{ i.remark }}</p>
              <div>
                <p>支付方式：{{ i.pay }}</p>
                <p>购买金额：<span class="pay">{{ `${(i.price / 100).toFixed(2)}￥` }}</span></p>
              </div>
            </div>
          </div>
          </lazy-component>
        </van-tab>
    </van-tabs>
    <van-back-top right="5vw" bottom="10vh" />
  </div>
</template>
<script setup>
import { myOrder } from '../../api/home.js'
import { ref, watch } from 'vue'
const active = ref('0');
let orders = ref([
  { title: '全部订单', icon: "description", data: [] },
  { title: '待支付', icon: "gold-coin-o", data: [] },
  { title: '待发货', icon: "free-postage", data: [] },
  { title: '待收货', icon: "logistics", data: [] },
  { title: '待评价', icon: "comment-o", data: [] },
])
async function needData() {
  let res = await myOrder({
    limit: 100,
    page: 1,
    status: active.value
  })
  if (res.data.list) {
    res.data.list.forEach(item => {
      if (item.status == 1) {
        item.buy = '待支付'
      } else if (item.status == 2) {
        item.buy = '待发货'
      } else if (item.status == 3) {
        item.buy = '待收货'
      } else if (item.status == 4) {
        item.buy = '待评价'
      }
      if (item.pay_type == 1) {
        item.pay = '微信'
      } else if (item.pay_type == 2) {
        item.pay = '支付宝'
      } else if (item.pay_type == 3) {
        item.pay = '云闪付'
      } else {
        item.pay = '未支付'
      }
    })
  }
  orders.value[active.value].data = res.data.list?.reverse?.() || []

}
needData()
// 监听那个状态给东西
watch(active, (newVal, oldVal) => {
  needData()
});
console.log(orders.value);
</script>

<style scoped lang="scss">
.order {
  font-size: 12px;

  .buy {
    position: relative;
    background-color: white;
    padding: 10px;
    box-sizing: border-box;
    margin: 10px;

    .head {
      .status {
        position: absolute;
        right: 10px;
        top: 10px;
        border-radius: 4px;
        font-weight: bold;
      }

      .status-pending {
        color: orange;
      }

      .status-shipping {
        color: blue;
      }

      .status-receiving {
        color: green;
      }

      .status-evaluating {
        color: red;
      }

      .time {
        color: #888;
      }
    }

    .goods-card {
      margin: 0;
      background-color: white;
      --van-card-price-color: #FF007F;

      .title {
        font-size: 14px;
      }

      .money {
        color: black;
        font-size: 14px;
      }
    }

    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      align-items: flex-end;

      .pay {
        color: black;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
}
</style>