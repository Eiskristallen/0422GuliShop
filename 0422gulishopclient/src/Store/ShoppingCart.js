//vuex数据模块化
//因为不会返回数据,所以不需要state和mutation
import { reqAddOrUpdateCart } from '@/Api';
import { reqCart } from '@/Api';
const state = {
  shopCartList: [],
};
const mutations = {
  RECEIVESHOPCARTLIST(state, shopCartList) {
    state.shopCartList = shopCartList;
  },
};
const getters = {};
const actions = {
  async getShopCart({ commit }) {
    const result = await reqCart();
    if (result.code === 200) {
      commit('RECEIVESHOPCARTLIST', result.data);
    }
  },
  async addOrUpdateShoppingCart({ commit }, { skuId, skuNum }) {
    const result = await reqAddOrUpdateCart(skuId, skuNum);
    return result.code === 200
      ? 'ok'
      : Promise.reject(new Error('request failed'));
  },
}; //发请求拿数据,还是需要写

export default {
  actions,
  getters,
  state,
  mutations,
};
