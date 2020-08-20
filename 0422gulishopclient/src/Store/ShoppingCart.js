//vuex数据模块化
//因为不会返回数据,所以不需要state和mutation
import { reqAddOrUpdateCart, reqUpdateIsChecked } from '@/Api';
import { reqCart, reqDeleteCart } from '@/Api';
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
  //单个购物车删除
  async updateIsChecked({ commit }, { skuId, isChecked }) {
    const result = await reqUpdateIsChecked(skuId, isChecked);
    return result.code === 200
      ? 'ok'
      : Promise.reject(new Error('request failed'));
  },
  //多个购物车删除
  async updateAllChecked({ commit, state, dispatch }, val) {
    let promises = [];
    state.shopCartList.forEach((item) => {
      if (item.isChecked === val) return;

      let promise = dispatch('updateIsChecked', {
        skuId: item.skuId,
        isChecked: val,
      });

      promises.push(promise);
    });
    return Promise.all(promises);
  },

  //删除购物车
  async deleteCart({ commit }, skuId) {
    const result = await reqDeleteCart(skuId);
    return result.code === 200
      ? 'delete successful'
      : Promise.reject(new Error('request failed'));
  },
  async deleteAllChecked({ commit, state, dispatch }) {
    let promises = [];
    state.shopCartList.forEach((item) => {
      if (item.isChecked === 0) return;
      let promise = dispatch('deleteCart', item.skuId);
      promises.push(promise);
    });
    return Promise.all(promises);
  },
}; //发请求拿数据,还是需要写

export default {
  actions,
  getters,
  state,
  mutations,
};
