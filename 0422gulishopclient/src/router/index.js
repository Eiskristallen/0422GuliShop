import Vue from 'vue';
//引入Vue和VueRoute
import VueRoute from 'vue-router';
//引入routes配置文件
import routers from './routers';
//注册插件,注册时会调用插件里面的install方法
Vue.use(VueRoute);
//new一个VueRoute对象
//处理vue-router上面的push方法,让他能够catch错误,彻底解决navigation duplicated问题
//先获取原方法
const originPush = VueRoute.prototype.push;
//修改原型上的方法
//返回一个原来的原型上的方法,直接调用,然后this指向的还是Vue.prototype
//第二个参数为push方法里面传入的配置参数,最后因该方法的返回值为promise,设置一个catch方法处理失败的情况吗,解决navigation duplicated
// function还有可能接收到回调函数,比如处理promise的回调
VueRoute.prototype.push = function(location, onResolved, onRejected) {
  //这种情况是根本没有传回调函数
  if (onResolved === undefined && onRejected === undefined) {
    return originPush.call(this, location).catch(() => {});
  } else {
    return originPush.call(this, location, onResolved, onRejected);
  }
};
//修改replace
const originReplace = VueRoute.prototype.replace;
VueRoute.prototype.replace = function(location, onResolved, onRejected) {
  if (onResolved === undefined && onRejected === undefined) {
    return originReplace.call(this, location).catch(() => {});
  } else {
    return originReplace.call(this, location, onResolved, onRejected);
  }
};
const router = new VueRoute(
  routers
  //路由配置对象,数组里面每一个对象都是一个路由组件
);
//export VueRoute对象
export default router;
