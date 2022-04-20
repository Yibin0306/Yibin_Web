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
    const token = localStorage.getItem("token");
    if (token == null ||
      token == undefined) {
      // 没有token
      next({
        path: "/"
      })
      return
    }
    axios.get("/system/isSign", {
      headers: {
        token: token
      }
    }).then((res) => {
      var result = res.data;
      if (result.code == 102) {
        ElementUI.Message({
          message: "身份验证失败！",
          type: 'error'
        });
        localStorage.clear("token")
        next({
          path: "/"
        })
        return;
      }
      next();
    }).catch((e) => {
      ElementUI.Message({
        message: "网络请求异常，请重新登录",
        type: "error"
      })
      localStorage.clear("token")
      next({
        path: "/"
      })
    })
  } else {
    next();
  }
})
var loadingInstance;
var loadingVisable = false;
axios.interceptors.request.use(
  config => {
    if(!loadingVisable){
      loadingInstance = ElementUI.Loading.service({});
      loadingVisable = true;
    }
    const token = localStorage.getItem("token")
    if( token != null || token != undefined ){
      config.headers = {
        token: token
      }
    }
    return config
  },
  error => {
    loadingInstance.close();
    loadingVisable = false;
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    loadingInstance.close();
    loadingVisable = false;
    console.log(loadingInstance)
    if(response.data.code == 101){
      ElementUI.Message({
        message: response.data.msg,
        type: "error"
      })
    }else if(response.data.code == 102) {
      ElementUI.Message({
        message: response.data.msg,
        type: "error"
      })
      localStorage.clear("token")
      window.location.href = "/";
    }
    return response
  }, function(error){
    loadingInstance.close();
    loadingVisable = false;
    if(error && error.response) {
      switch(error.request.status) {
        case 404:
          ElementUI.Message({
            message: "请求资源不存在！",
            type: "error"
          })
          break;
        case 405:
          ElementUI.Message({
            message: "请求方式错误！",
            type: "error"
          })
          break;
        case 500:
          ElementUI.Message({
            message: "服务器错误，请联系管理员！",
            type: "error"
          })
          break;
        case 503:
          ElementUI.Message({
            message: "服务器维护中，请稍后再试！",
            type: "error"
          })
          break;
        default:
          ElementUI.Message({
            message: "未知错误！",
            type: "error"
          });
      }
    }else{
      ElementUI.Message({
        message: "网络错误，请联系管理员！",
        type: "error"
      })
    }
    return Promise.reject(error);
  }
)
new Vue({
  render: h => h(App),
  router: router,
}).$mount('#app')
