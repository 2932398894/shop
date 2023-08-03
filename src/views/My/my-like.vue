<template>
  <div class="collection">
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
    <van-back-top right="5vw" bottom="10vh" />
  </div>
</template>
<script setup>
import { myLike } from '../../api/home.js'
import { ref } from 'vue'
let essayData = ref([])
async function Data() {
    let res = await myLike({
      type: 2,
      page: 1,
      limit: 100
    })
    essayData.value = res.data.list
  }
Data()

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
}
</style>