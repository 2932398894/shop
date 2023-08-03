<template>
  <van-nav-bar :title="title"  left-text="返回" left-arrow @click-left="onClickLeft" />
</template>
<script setup>
import { defineProps, } from 'vue';

const onClickLeft = () => history.back();
const prop = defineProps( {
  title: {
    type: String,
    required: true,
  },
})
</script>