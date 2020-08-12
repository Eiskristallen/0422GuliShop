import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import Typenav from '@/components/Type-nav';
import './Api';
//引入vuex
import store from '@/Store';

//因为api里面暴露的是一个方法,就可以直接引入里面的方法
// import { reqCategoryList } from './Api';
//组件三大步:定义 注册  使用
Vue.config.productionTip = false;
//全局都要用的type-nav,直接全局注册
Vue.component('Type-nav', Typenav);
new Vue({
  el: document.getElementById('app'),
  //注入路由功能1,让组件能够通过$route和$router拿到路由上的东西
  router,
  store,
  render: (h) => h(App), //template
  // 1.注册组件APP
  // 2.使用组件
  // 3.渲染组件
  // components: {
  //   App,
  // },
  // template: '<App/>',
});
