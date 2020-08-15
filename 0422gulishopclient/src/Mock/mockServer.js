//模拟后端的mock文件
import mock from 'mockjs';
import banner from './banner.json';
import floor from './floor.json';
//此方法用来模拟接口
//第一个参数是模拟的接口的路径
//第二个参数是返回的数据是啥
//data是刚才的json文件
//json引入之后会变成原本里面写的数据结构(对象就是对象,数组就是数组)
mock.mock('/Mock/banner', { code: 200, data: banner });
mock.mock('/Mock/floor', { code: 200, data: floor });
