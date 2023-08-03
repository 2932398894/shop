<template>
  <div class="collection">
    <van-tabs v-model:active="active" swipeable>
      <van-tab class="shop">
        <template #title> <van-icon name="shop-collect-o" size="20px" /> 商品收藏</template>
        <van-swipe-cell v-for="item in shopData" :key="item.id">
          <lazy-component>
            <router-link :to="`/shop/${item.goods.id}`">
              <van-card :desc="item.goods.detail" class="goods-card" lazy-load :thumb="item.goods.picUrl"
                :price="(item.goods.price / 100).toFixed(2)">
                <template #num>
                  <span>收藏时间：{{ item.updated_at }}</span>
                </template>
                <template #title>
                  <p class="title">{{ item.goods.name }}</p>
                </template>
              </van-card>
            </router-link>
          </lazy-component>
        </van-swipe-cell>
      </van-tab>
      <van-tab>
        <template #title> <van-icon name="orders-o" size="20px" /> 文章收藏</template>
        <van-swipe-cell v-for="item in essayData" :key="item.id">
          <lazy-component>
            <router-link :to="`/grass/${item.article.id}`">
              <van-card :desc="item.detail" :title="item.article.title" class="goods-card" lazy-load
                :thumb="item.article.picUrl">
                <template #num>
                  <span>收藏时间：{{ item.updated_at }}</span>
                </template>
                <template #price>
                  <p>{{ item.article.desc }}</p>
                </template>
              </van-card>
            </router-link>
          </lazy-component>
        </van-swipe-cell>
      </van-tab>
    </van-tabs>
    <van-back-top right="5vw" bottom="10vh" />
  </div>
</template>
<script setup>
import { myCollect } from '../../api/home.js'
import { ref, watch } from 'vue'
const active = ref('1');
let shopData = ref([])
let essayData = ref([])
async function Data() {
  // 默认是商品
  if (active.value == 1) {
    let res = await myCollect({
      type: active.value,
      page: 1,
      limit: 100
    })
    // console.log(res);
    shopData.value = res.data.list
  } else {
    let res = await myCollect({
      type: 2,
      page: 1,
      limit: 100
    })
    // console.log(res);
    essayData.value = res.data.list
  }
}
Data()
watch(active, (newVal, oldVal) => {
  // console.log(`新值：${newVal}，旧值：${oldVal}`);
  Data()
});


</script>
<style scoped lang="scss">
.collection {
  font-size: 12px;

  .shop {
    --van-card-num-font-size: 14px;
    --van-card-price-color: #FF4500;
  }

  .goods-card {
    margin: 15px 10px;
    background-color: white;
    position: relative;

    .title {
      font-size: 14px;
    }
  }
}</style>