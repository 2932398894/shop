<script setup>
import { RouterView, useRoute } from 'vue-router'
import NavFooter from '@/components/Nav-footer.vue'
import { watch, ref } from 'vue';
import { carStore } from './stores/car.js'
import NavHead from './components/Nav-head.vue';
const routes = useRoute()
const have = ref(false)
let show = ref(false)
watch(routes, newVal => {
  // 每次都获取仓库里面的数据
  carStore().needCar()
  have.value = Boolean(newVal.meta.title);
  show.value = Boolean(newVal.meta.show);
})

</script>

<template>
  <NavHead v-if="show" :title="routes.meta.show"></NavHead>
  <RouterView />
  <NavFooter v-if="have"></NavFooter>
</template>

<style scoped></style>
