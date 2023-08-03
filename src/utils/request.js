import axios from 'axios'
import { getToken,removeToken } from '../utils/auth.js'
import router from '@/router';
import { showNotify } from 'vant';
import { useCounterStore } from '../stores/user.js'
import {removeData} from '../utils/information.js'
const request = axios.create({
  baseURL: 'http://8.218.112.99/ml/ml-mall',
  timeout: 5000,
  headers: { 'X-Custom-Header': 'foobar' }
});
// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 把tooken给服务器
  config.headers['Authorization'] = 'Bearer '.concat(getToken());
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(response => {
  // console.log("---response:", response);
  const data = response.data;
  if (data.code !== 1) {
    if (data.code === 0) {
      // 去调用其它接口，如果没有登录，就没有token
      // 服务器返回code是0，需要去登录，去/login
      // 如果你本来要去的页面就是/login  
      if (router.currentRoute.value.path !== '/login') {
        router.push('/login');
      }
    }
    if (data.code === 3) {
      // 通知
      showNotify({
        type: 'danger',
        message: '用户名或密码错误',
        duration: 1500,
      });
    } else {
      // 过期或未登录
      if (data.message === '请登录') {
        const userStore = useCounterStore();
        // 过期或未登录重置用户仓库数据
        userStore.delUser();
        // 重置本地数据
        removeData();
        // 删除token
        removeToken();
      }
      // 通知
      showNotify({
        type: 'danger',
        message: data.message || '系统繁忙',
        duration: 1500,
      });
    }
    return Promise.reject(data);
  }
  return response.data;
}, error => Promise.reject(error))
export default request