import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '../utils/auth'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 路由守卫
function authGuard(to, from, next) {
  return async (to, from, next) => {
    const token = getToken();
    if (token) {
      next();
    } else {
      next('/login'); // 如果没有登录，重定向到登录页面
    }
  };
}

// 每次拿路由获取商品数据
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      // 登录
      path: '/login',
      name: 'login',
      component: () => import('../views/Login/index.vue'),
      meta: {
        show: '登录'
      }
    },
    {
      // 主页
      path: '/home',
      name: 'home',
      meta: {
        title: '首页',
        icon: "home-o",
      },
      component: () => import('../views/Home/index.vue'),
    },
    {
      // 种草
      path: '/grass',
      name: 'grass',
      meta: {
        title: '种草',
        icon: "gift-card",
        show: '种草推荐'
      },
      component: () => import('../views/Needgrass/index.vue'),
      beforeEnter: authGuard() // 引用守卫函数
    },
    {
      // 购物车
      path: '/car',
      name: 'car',
      meta: {
        title: '购物车',
        icon: "shopping-cart-o",
        show: '购物车',
        buy:'have',
      },
      component: () => import('../views/Buycar/index.vue'),
      beforeEnter: authGuard() // 引用守卫函数
    },
    {
      // 我的
      path: '/my',
      name: 'my',
      meta: {
        title: '我的',
        icon: "manager-o",
        show: '我的'
      },
      component: () => import('../views/My/index.vue'),
      beforeEnter: authGuard() // 引用守卫函数
    },
    // 商品详情
    {
      path: '/shop/:shopId',
      name: 'shop',
      meta: {
        show: '商品详情'
      },
      component: () => import('../views/Home/shops.vue'),
    },
    // 地址详情
    {
      path: '/shop/addres',
      name: 'addres',
      meta: {
        show: '收货地址'
      },
      component: () => import('../views/BuyShop/address.vue'),
    },
    // 地址修改
    {
      path: '/shop/addres-set',
      name: 'addres-set',
      meta: {
        show: '新增地址'
      },
      component: () => import('../views/BuyShop/modify.vue'),
    },
    // 订单生成
    {
      path: '/shop/orders',
      name: 'order',
      meta: {
        show: '订单详情'
      },
      component: () => import('../views/BuyShop/orders.vue'),
    },
     // 订单列表
     {
      path: '/my/order',
      name: 'my-orders',
      meta: {
        show: '订单列表'
      },
      component: () => import('../views/My/order.vue'),
    },
    {
      // 我的文章
      path: '/my/my-article',
      name: 'my-article',
      meta: {
        show: '我的文章',
      },
      component: () => import('../views/My/my-article.vue'),
    },
    {
      // 我的收藏
      path: '/my/my-collection',
      name: 'my-collection',
      meta: {
        show: '我的收藏',
      },
      component: () => import('../views/My/collection.vue'),
    },
    {
      // 文章列表详情
      path: '/grass/:essay',
      name: 'essay',
      meta: {
        show: '文章详情'
      },
      component: () => import('../views/Needgrass/essay.vue'),
    },
    {
      // 文章添加
      path: '/grass/addessay',
      name: 'addessay',
      meta: {
        show: '文章添加'
      },
      component: () => import('../views/Needgrass/add-essay.vue'),
    },
    {
      // 我的收藏
      path: '/my/my-like',
      name: 'my-like',
      meta: {
        show: '我的喜欢',
      },
      component: () => import('../views/My/my-like.vue'),
    },
    {
      // 修改信息
      path: '/my/my-edit',
      name: 'my-edit',
      meta: {
        show: '修改信息',
      },
      component: () => import('../views/My/edit-myinfo.vue'),
    },
  ]
})
router.beforeEach((to, from, next) => {
  nProgress.start()
  return next()
})
router.afterEach((to, from, next) => {
  nProgress.done()
})
export default router
