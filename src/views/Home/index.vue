<template>
  <div class="box">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in map" :key="item.id">
        <img :src="item.pic_url" alt="图片不见了">
      </van-swipe-item>
    </van-swipe>
    <h3 class="good">商品</h3>
    <div class="item-box">
      <router-link :to="`/shop/${item.id}`"  v-for="item in shops" :key="item.id">
        <lazy-component>
      <div class="item">
        <div class="img_box">
          <img :src="item.pic_url" alt="图片不见了">
        </div>
        <h3>{{ item.name }}</h3>
        <p>{{ (item.price / 100).toFixed(2) }}元</p>
      </div>
    </lazy-component>
    </router-link>
    </div>
    <van-back-top right="5vw" bottom="10vh" />
    <p class="without">没有更多了</p>
  </div>
</template>
<script setup>
import { Carousel, Shop } from '../../api/home.js'
import { ref } from 'vue';
// 发送轮播图请求
let map = ref([])
let shops = ref([])
async function needMap() {
  map.value = (await Carousel({ limit: 100, page: 1 })).data.list || []
  // console.log(map.value);
}
async function needShap() {
  let res = await Shop({ limit: 100, page: 1 })
  let max = Math.ceil(res.data.count / 100)
  let arr = []
  for (let i = 0; i < max; i++) {
    let { data } = await Shop({ page: i + 1, limit: 100 })
    // 不同的数组拼接要展开
    arr.push(...data.list)
  }
  // console.log(arr);
  shops.value = arr
}
needShap()
needMap()
// 发送商品请求

</script>
<style scoped lang="scss">
.my-swipe .van-swipe-item {
  height: 168px;

  img {
    width: 100%;
    height: 100%;
  }
}

.box {
  display: flex;
  flex-direction: column;
  font-size: 12px;

  .without {
    color: #969799;
    margin: 20px auto;
  }

  .good {
    font-size: .42667rem;
    font-weight: 500;
    color: #0fc4b5;
    text-align: center;
    line-height: 50px;
    height: 50px;
  }

  .item-box {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    .item {
      width: 170px;
      height: 250px;
      background-color: white;
      margin: 5px 5px;

      .img_box {
        height: 180px;
      }

      img {
        width: 165px;
      }

      h3 {
        color: #222333;
        font-size: 15px;
        text-align: center;
      }

      p {
        color: #1baeae;
        font-size: 12px;
        text-align: center;
      }
    }
  }
}
</style>