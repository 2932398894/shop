<template>
  <div class="grass">
    <van-icon name="add-o" color="#1989fa" class="add" @click=" router.replace('/grass/addessay')" />
    <van-swipe-cell v-for="item in list" :key="item.id">
      <lazy-component>
        <router-link :to="`/grass/${item.id}`">
          <van-card :desc="item.detail" :title="item.title" class="goods-card" lazy-load :thumb="item.pic_url">
            <template #num>
              <span>更新时间：{{ item.updated_at }}</span>
            </template>
            <template #price>
              <p>{{ item.desc }}</p>
            </template>
          </van-card>
        </router-link>
      </lazy-component>
    </van-swipe-cell>
    <van-back-top right="5vw" bottom="10vh" />
    <p class="without">没有更多了</p>
  </div>
</template>
<script setup>
import { myArticle } from '../../api/grass.js'
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
let list = ref([])
async function needList() {
  let res = await myArticle({ limit: 100, page: 1 })
  list.value = res.data.list||[]
  console.log(res);
}
needList()

</script>
<style scoped lang="scss">
.grass {
  padding: 10px;
  position: relative;
  font-size: 12px;

  .goods-card {
    margin: 10px 0;
    background-color: white;
  }

  .without {
    color: #969799;
    margin: 20px auto;
    text-align: center;
  }

  .add {
    position: absolute;
    top: -35px;
    left: 330px;
    z-index: 2;
    font-size: 20px;
  }
}
</style>