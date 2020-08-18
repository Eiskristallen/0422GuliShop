//vuex数据模块化

import { reqDetailInfor } from '@/Api';
const state = {
  detailInfor: [],
};
const getters = {
  categoryView(state) {
    return state.detailInfor.categoryView || {};
  },
  skuInfo(state) {
    return state.detailInfor.skuInfo || {};
  },
  spuSaleAttrList(state) {
    return state.detailInfor.spuSaleAttrList || [];
  },
};
const actions = {
  async getDetailInfor({ commit }, skuId) {
    const result = await reqDetailInfor(skuId);
    if (result.code === 200) {
      commit('RECEIVEDETAILINFOR', result.data);
    }
  },
}; //发请求拿数据
const mutations = {
  RECEIVEDETAILINFOR(state, detailInfor) {
    state.detailInfor = detailInfor;
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
