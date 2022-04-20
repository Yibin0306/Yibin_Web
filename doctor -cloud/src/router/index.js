import Vue from 'vue'
import VueRouter from 'vue-router'

const Login =()=>import('../views/Login.vue') // 登录
const Index =()=>import('../views/Index.vue') // 首页

const Mybingren =()=>import ('../views/Mybingren.vue') //病人
const Ebingli =()=>import ('../views/Ebingli.vue') //病历
const Zhuyuan =()=>import ('../views/Zhuyuan.vue') //住院
const Baogao =()=>import ('../views/Baogao.vue') //报告查询
const Chuyuan =()=>import ('../views/Chuyuan.vue') //出院管理
const Chufang =()=>import ('../views/Chufang.vue') //处方管理 和咨询模块公用页面

const Myinfo =()=>import ('../views/Myinfo.vue') //处方管理

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
    
  },
  {
    path:"/login", //登录配置
    name: 'Login',
    component: Login

  },
  
  {
    path:"/index", // 首页配置
    name: 'Index',
    component: Index,
    redirect:'/index/mybingren',
    children:[{
      
        path:"mybingren", // 我的病人
        name: 'Mybingren',
        component: Mybingren
    },
    {
      path:"ebingli", // 电子病历
      name: 'Ebingli',
      component: Ebingli
    },
    {
      path:"zhuyuan", // 住院管理
      name: 'Zhuyuan',
      component: Zhuyuan
    },
    {
      path:"baogao", // 报告查询
      name: 'Baogao',
      component: Baogao
    },
    {
      path:"chuyuan", // 出院管理
      name: 'Chuyuan',
      component: Chuyuan
    },
    {
      path:"chufang", // 处方管理
      name: 'Chufang',
      component: Chufang
    },

    {
      path:"zixun", // 咨询
      name: 'Chufang',
      component: Chufang
    },
    {
      path:"myinfo", // 个人信息
      name: 'Myinfo',
      component: Myinfo
    }

  ]
  }
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
