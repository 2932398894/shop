<template>
  <van-tabbar v-model="active">
    <van-tabbar-item :icon="item.meta.icon" v-for="(item, i) in routes" :key="i" v-show="item.meta.title" :to="item.name">
      {{ item.meta.title }}
      <van-badge :content="num" class="num" v-if="Boolean(item.meta.buy)" :show-zero="false" />
    </van-tabbar-item>
  </van-tabbar>
</template>
<script setup>
import { carStore } from '../stores/car.js'
import router from '../router';
import { ref, watch } from 'vue';

let routes = router.getRoutes()
const active = ref(0);
const num = ref(0);

const store = carStore()
store.needCar()
num.value = store.num

// 使用watch来实时更新num的值
watch(() => store.num, (newValue) => {
  num.value = newValue;
});
</script>
<style scoped>
.van-tabbar-item {
  position: relative;
}

.van-badge--top-right {
  position: absolute;
  font-size: 12px;
  top: 10px;
  left: 45px;
  width: 25px;
}
</style>