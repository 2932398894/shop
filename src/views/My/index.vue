<template>
  <div class="user">
    <div class="user-header">
      <van-image round width="2.5rem" height="2.5rem" :src="user.avatar" @error="handleError" />
      <div class="user-info">
        <div class="edit" @click="edit(user)">
          <van-icon name="edit" size="20" color="#1989fa" />
        </div>
        <h2>{{ user.name }}</h2>
        <p :class="{ male: user.sex == '1', female: user.sex == '0' }">性别：{{ user.sex == 1 ? '男' : '女' }}</p>
        <span>个性签名：{{ user.sign }}</span>
      </div>
    </div>
    <van-cell-group class="user-set">
      <van-cell icon="free-postage" title="我的收货地址" is-link to="/shop/addres" />
      <van-cell icon="orders-o" title="我的订单" is-link to="/my/order" />
      <van-cell icon="notes-o" title="我的文章" is-link to="/my/my-article" />
      <van-cell icon="star-o" title="我的收藏" is-link to="/my/my-collection" />
      <van-cell icon="good-job-o" title="我的点赞" is-link to="/my/my-like" />
    </van-cell-group>
    <van-button type="primary" block @click="quit">退出登录</van-button>
    <van-dialog v-model:show="show" title="标题" show-cancel-button @confirm="handleConfirm">
      <p style="text-align: center;margin: 15px;">是否退出登录</p>
    </van-dialog>
    <van-back-top right="5vw" bottom="10vh" />
  </div>
</template>
<script setup>
// 从仓库获取数据
import { getToken, removeToken } from '../../utils/auth.js'
import { getData, removeData } from '../../utils/information.js'
import { ref } from 'vue'
import { showToast } from 'vant';
import { useRouter } from 'vue-router';
import { carStore } from '../../stores/car.js'
const router = useRouter()
let user = ref()
const show = ref(false);
let fallbackSrc = 'https://cdn.pixabay.com/photo/2013/06/12/22/20/mountains-139012_640.jpg' // 设置备用图片的URL
// 查看有没有token
if (getToken()) {
  // 重新获取用户数据
  user.value = getData()
} else {
  // 没有重置
  removeData()
}
// console.log(user.value);
// 没有头像，用我的
function handleError() {
  user.value.avatar = fallbackSrc;
}
// 确认退出
function handleConfirm() {
  // 在用户点击确认按钮时触发
  // 处理确认逻辑
  // console.log('确认按钮被点击');
  // 删除token还有用户数据
  removeToken()
  removeData()
  carStore().react()
  showToast('退出成功');
  router.replace({
    path: '/login', // 目标路由的路径
  })
}
// 退出
let quit = () => {
  show.value = true
}
// 修改用户信息
function edit(user){
  // console.log(user);
  router.replace({
      path: '/my/my-edit', // 目标路由的路径
    })
}
</script>
<style scoped lang="scss">
.male {
  color: #87CEEB;
  font-size: 14px;
}

.female {
  color: pink;
  font-size: 14px;
}

.user {
  font-size: 12px;
  box-sizing: border-box;
  padding: 15px;

  .user-set {
    margin: 30px 0;
  }

  .user-header {
    width: 100%;
    box-sizing: border-box;
    padding: 15px 25px;
    background: white;
    display: flex;
  }

  .user-info {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    justify-content: space-evenly;
    position: relative;

    .edit {
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      right: -20px;
      top: 10px;
    }

    h2 {
      font-size: 16px;
    }

    span {
      color: #FF4500;
    }
  }
}
</style>