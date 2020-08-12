import Ajax from '@/Ajax/Ajax';
//这个文件是所有请求接口的函数文件
export const reqCategory = () => {
  //调用二次封装后的axios,直接可以拿到data
  return Ajax({
    url: '/product/getBaseCategoryList',
    method: 'get',
  });
};
//这个文件要在main里面运行
// reqCategory();
