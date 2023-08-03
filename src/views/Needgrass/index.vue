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
import { grassList } from '../../api/grass.js'
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
let list = ref([])
async function needList() {
  let res = await grassList({ limit: 100, page: 1, id: 'id' })
  let max = Math.ceil(res.data.count / 100)
  let arr = []
  for (let i = 0; i < max; i++) {
    let { data } = await grassList({ page: i + 1, limit: 100, id: 'id' })
    // 不同的数组拼接要展开
    arr.push(...data.list)
  }
  list.value = arr
}
needList()

</script>
<style scoped lang="scss">
::v-deep .van-card__content {
  display: flex;
  justify-content: space-evenly;
}

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