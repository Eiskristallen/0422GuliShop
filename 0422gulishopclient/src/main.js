import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
//组件三大步:定义 注册  使用
Vue.config.productionTip = false;
new Vue({
  el: document.getElementById('app'),
  //注入路由功能1,让组件能够通过$route和$router拿到路由上的东西
  router,
  render: (h) => h(App), //template
  // 1.注册组件APP
  // 2.使用组件
  // 3.渲染组件
  // components: {
  //   App,
  // },
  // template: '<App/>',
});
