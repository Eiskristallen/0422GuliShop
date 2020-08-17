//vuex数据模块化
import { reqGoodsListInfo } from '@/Api';
const state = {
  goodListInfo: {},
};
const getters = {
  attrsList(state) {
    return state.goodListInfo.attrsList || [];
  },
  goodList(state) {
    return state.goodListInfo.goodsList || [];
  },
  trademarkList(state) {
    return state.goodListInfo.trademarkList || [];
  },
};
const actions = {
  //通过dispatch去调用actions里面的函数时,第二个参数是传入给actions函数的参数,如果有多个参数则需要写成对象的形式
  async getGoodListInfo({ commit }, searchParams) {
    const result = await reqGoodsListInfo(searchParams);
    if (result.code === 200) {
      commit('RECEIVEGOODLISTINFO', result.data);
    }
  },
}; //发请求拿数据
const mutations = {
  RECEIVEGOODLISTINFO(state, goodListInfo) {
    state.goodListInfo = goodListInfo;
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
