import Ajax from '@/Ajax/Ajax';
//这个文件是所有请求接口的函数文件
import mockAjax from '@/Ajax/mockAjax';
//模拟的
export const reqCategory = () => {
  //调用二次封装后的axios,直接可以拿到data
  return Ajax({
    url: '/product/getBaseCategoryList',
    method: 'get',
  });
};
//这个文件要在main里面运行
// reqCategory();

export const reqBannerlist = () => {
  return mockAjax({
    url: '/banner',
    method: 'get',
  });
};
export const reqFloor = () => {
  return mockAjax({
    url: '/floor',
    method: 'get',
  });
};
