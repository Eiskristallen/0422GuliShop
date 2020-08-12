import Nprogress from 'nprogress';
//引入nprogress的js
//引入nprogress的css
import 'nprogress/nprogress.css';
import axios from 'axios';
// 二次封装axios,让返回来的直接是数据
//1.配置基础路径和超时限制
//2.统一处理请求错误
//3.返回的response不需要.data,而是直接返回数据
//4.该模块为ajax请求模块
//还可以给网页添加进度条(Nprogress)
//二次封装axios用create去封装,用create创建一个新的实例进行操作
const customAxios = axios.create({
  //配置基础路径和超时时间
  baseURL: '/api',
  timeout: 20000,
  //配置请求响应拦截器
  //请求拦截器当中添加打开进度条的方法
});
customAxios.interceptors.request.use(function(config) {
  //config 等同于请求报文
  //最后要return回去
  Nprogress.start(); //开始进度条
  return config;
  // 也可以写处理失败的回调函数,但是没有必要
});
customAxios.interceptors.response.use(
  function(response) {
    //response 等同于响应报文
    //直接返回response.data,省的之后还要多点一层data
    //response.data.data里面才是真正的请求信息
    Nprogress.done(); //结束进度条
    return response.data;
  },
  function(error) {
    alert('fail' + error.message || 'unknow error');
    Nprogress.done(); //结束进度条
    //如果需要进一步处理错误,则返回失败状态的promise,如果不需要二次处理错误,则返回一个pending状态的promise
    //return pending promise 可以终止promise链
    // return Promise.reject(new Error('request fail'));
    return new Promise(() => {});
  }
);

export default customAxios; //把二次封装后的axios暴露出去
