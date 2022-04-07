import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from "vue-router"
import App from './App.vue'
import router from "@/router.js";
import "@/assets/globle.css";
import * as echarts from 'echarts/core';
import axios from "axios"
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueRouter);
import {
  MessageBox
} from 'element-ui';
/**
 * 设置Ajax请求超时事件为5秒(5000毫秒)
 */
// 响应过期时间五秒钟
axios.defaults.timeout = 5000;
// 身份验证
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log("不是登录界面")
    const token = localStorage.getItem("token");
    if (token == null ||
      token == undefined) {
      // 没有token
      next({
        path: "/"
      })
      return
    }
    axios.get("/user/isSign", {
      headers: {
        token: token
      }
    }).then((res) => {
      var result = res.data;
      if (result.code == 102) {
        console.log("身份验证失败")
        localStorage.clear("token")
        next({
          path: "/"
        })
        return;
      }
      next();
    }).catch((e) => {
      console.log("发生了错误！")
      next({
        path: "/"
      })
    })
  } else {
    console.log("是登录页面")
    next();
  }
})

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token")
    if( token != null || token != undefined ){
      config.headers = {
        token: token
      }
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

new Vue({
  render: h => h(App),
  router: router,
}).$mount('#app')
