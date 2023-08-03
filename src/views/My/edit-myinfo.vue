<template>
  <div class="edit">
    <h2>请修改你的密码还有你的信息</h2>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field v-model="userName" label="你的账号" class="name" disabled/>
        <van-field v-model="oldpassword" name="用户名" label="原密码" placeholder="请输入原密码" autocomplete="new-password"
          :rules="[{ validator: knowpwd, message: '原密码不正确' }]" />
        <van-field v-model="newpassword" type="password" name="新密码" label="新密码" placeholder="请输入新密码"
          autocomplete="new-password" :rules="[{ required: true, message: '请填写新密码' }]" />
        <van-field v-model="password" type="password" name="password" label="确认密码" placeholder="请再次输入新密码"
          autocomplete="new-password" :rules="[{ validator: contrast, message: '请确认密码' }]" />
        <van-field v-model="defend"  name="defend" label="修改密保" placeholder="请修改密保"
          autocomplete="new-password" :rules="[{ required: true, message: '请修改密保' }]" />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { showToast } from 'vant';
import { editInfo, myInfo } from '../../api/home.js'
import { getData, removeData } from '../../utils/information.js'
import { removeToken } from '../../utils/auth.js'
import { useRouter } from 'vue-router';
import { carStore } from '../../stores/car.js'

const router = useRouter()
const newpassword = ref('');
const oldpassword = ref('');
const password = ref('');
const defend = ref('')
let userName=ref('')
// 进行密码修改
const onSubmit = async (values) => {
  let res = await editInfo({
    password: password.value,
    secret_answer: defend.value
  })
  if (res.code == 1) {
    removeToken()
    removeData()
    carStore().react()
    showToast('退出成功');
    router.replace({
      path: '/login', // 目标路由的路径
    })
  }
};
// 密码校验
const knowpwd = (val) => {
  if (val !== getData().password) {
    return false
  } else {
    return true
  }
}
// console.log(getData());
// 里面没有要的信息
// 获取一下个人信息 
function user(){
  userName.value=getData().name
}
user()
// 确认密码
const contrast = (value) => {
  if (value !== newpassword.value) {
    return false
  } else {
    return true
  }
};
</script>
<style scoped lang="scss">
.edit {
  margin: 20px;
  font-size: 12px;
.name{
  color: #58727e !important;
}
  h2 {
    text-align: center;
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 15px;
  }
}
</style>