<template>
  <div class="box">
    <!-- <van-nav-bar title="用户登录" left-text="返回" left-arrow @click-left="onClickLeft" /> -->
    <div class="logo">
      <p>乐购</p>
      <p class="slogan">如果我能使一颗心免于哀伤，我就不虚此生。</p>
    </div>
    <van-form @submit="onSubmit" :submit-on-enter="true">
      <van-cell-group inset>
        <van-field v-model="from.name" name="name" label="用户名" placeholder="用户名" :rules="userRules" />
        <van-field v-model="from.password" type="password" name="password" label="密码" placeholder="密码"
          :rules="passwordRules" />
        <van-field name="sex" v-show="have" label="性别">
          <template #input>
            <van-radio-group v-model="from.sex" direction="horizontal">
              <van-radio name="1">男</van-radio>
              <van-radio name="2">女</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field v-show="have" name="uploader" label="头像上传" :rules="[{ required: have, message: '请上传头像' }]">
          <template #input>
            <van-uploader v-model="from.value" :max-count="1" />
          </template>
        </van-field>
        <van-field v-model="from.sign" label="签名" name="sign" placeholder="请输入个性签名"
          :rules="[{ required: have, message: '请填写个性签名' }]" v-show="have" />
        <van-field v-model="from.secret_answer" label="密保" placeholder="请验证密保" name="secret_answer"
          :rules="[{ required: have, message: '请填写密保' }]" v-show="have" />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="success" native-type="submit" v-if="!have">
          登录
        </van-button>
        <van-button round block type="primary" native-type="submit" style="margin: 16px 0;" v-else>
          注册
        </van-button>
        <van-button round block type="primary" @click="Look" style="margin: 16px 0;" v-show="!have">
          注册
        </van-button>
        <van-button round block plain v-show="have" type="primary" @click="have = false" style="margin: 16px 0;">
          返回登录
        </van-button>
      </div>
    </van-form>

  </div>
</template>
<script setup>
// 引入使用的配置项
import { Login, add } from '../../api/login.js'
import { showNotify } from 'vant';
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { setToken } from '../../utils/auth.js'
import { setData } from '../../utils/information.js'
import { carStore } from '../../stores/car.js'
// import {useCounterStore} from '../../stores/user.js'
// 进行路由的跳转
let router = useRouter()
let from = reactive({
  name: '',
  password: '',
  sex: '1',
  secret_answer: '',
  sign: '',
  value: []
})
const have = ref(false);
// 返回
// 进行密码教研
let passwordRules = [
  {
    pattern: /^[a-zA-Z0-9_-]{6,16}$/,
    message: '只能包含6-16位字母数字下划线减号',
    trigger: 'blur', // 触发验证的时机，默认是 'change'
  },
]
// 用户账户
let userRules = [
  {
    pattern: /^[a-zA-Z0-9_-]{4,12}$/,
    message: '只能包含4-12位字母数字下划线减号',
    trigger: 'blur', // 触发验证的时机，默认是 'change'
  },
]
// 登录还有注册
const onSubmit = async (values) => {
  if (have.value) {
    values.avatar = 'https://cdn.pixabay.com/photo/2013/06/12/22/20/mountains-139012_640.jpg'
    let res = await add(values)
    if (res.code == 1) {
      showNotify({ type: 'primary', message: '注册成功，前往登录' });
      have.value = false
      clear()
      from.name = values.name
    } else {
      showNotify({ type: 'primary', message: '注册失败，用户名重复' });
    }
  } else {
    let res = await Login(values)
    console.log(res);
    if (res.code == 1) {
      showNotify({ type: 'primary', message: '登录成功，前往主页' });
      // 要进行token还有数据存储
      let data = {
        name: values.name,
        avatar: res.data.avatar,
        sex: res.data.sex,
        sign: res.data.sign,
        password: values.password,
      }
      carStore().needCar()
      setData(data)
      setToken(res.data.token, res.data.expire_in)
      router.replace('/home')
      clear()
    }
  }
};
function clear() {
  from = reactive({
    name: '',
    password: '',
    sex: '1',
    secret_answer: '',
    sign: '',
    value: []
  })
}
// 进行表单出现
let Look = () => {
  clear()
  have.value = true
}

</script>
<style scoped lang="scss">
.box {
  display: flex;
  flex-direction: column;
  font-size: 12px;

  .logo {
    text-align: center;
    height: 100px;
    width: 100%;
    box-sizing: border-box;
    font-size: 16px;
    background: url('../../assets/img/湖水.jpg') no-repeat;
    background-size: cover;
    color: white;
    margin-bottom: 16px;

    p {
      margin: 6px 0;
      color: #1989fa
    }

    .slogan {
      // color: #1989fa;
      background: linear-gradient(to right, #1989fa, white);
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
    }

    img {
      width: 100%;
    }
  }
}
</style>