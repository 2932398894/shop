import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'amfe-flexible'
import App from './App.vue'
import router from './router'
import VueLazyload from 'vue-lazyload';
import '@fortawesome/fontawesome-free/css/all.css';
import './assets/icon/iconfont.css'    // 引入阿里云字体图标css

const app = createApp(App)

app.use(VueLazyload, {
  lazyComponent: true,
  loading: '加载中的占位图', // 当图片加载时显示的占位图
  error: '加载失败的占位图', // 当图片加载失败时显示的占位图
});
app.use(createPinia())
app.use(router)

app.mount('#app')
