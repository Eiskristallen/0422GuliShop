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
/*


{
      return {
        category3Id: '61',
        categoryName: '手机',

        keyword: '小米',
        order: '1:desc',
        pageNo: '1',
        pageSize: '10',
        props: ['1:1700-2799:价格', '2:6.65-6.74英寸:屏幕尺寸'],
        trademark: '4:小米',
      };
    },
 */
//searchParams代表搜索参数,这个参数必须有好友,至少得是一个没有属性的空对象
//如果是个空对象,获取的是全部的数据怒
//如果有属性,获取的是搜索条件匹配的数据
export const reqGoodsListInfo = (searchParams) => {
  return Ajax({
    url: '/list',
    method: 'post',
    data: searchParams,
  });
};

//该请求参数由组件返回(用户搜索的关键词)
// reqGoodsListInfo({});
export const reqDetailInfor = (skuId) => {
  return Ajax({
    url: `/item/${skuId}`,
    method: 'get',
  });
};
//添加或者修改购物车
export const reqAddOrUpdateCart = (skuId, skuNum) => {
  return Ajax({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post',
  });
};

//shopcart
export const reqCart = () => {
  return Ajax({
    url: `/cart/cartList`,
    method: 'get',
  });
};
