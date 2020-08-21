import { reqTradeInfor } from '@/Api';

//vuex数据模块化

const state = {
  tradeInfor: {},
};
const getters = {};
const actions = {
  //通过dispatch去调用actions里面的函数时,第二个参数是传入给actions函数的参数,如果有多个参数则需要写成对象的形式
  async getTradeInfor({ commit }) {
    const result = await reqTradeInfor();
    if (result.code === 200) {
      commit('RECERIVETRADEINFOR', result.data);
    }
  },
  // async getOrderDetail({ commit }, { tradeNo, data }) {
  //   const result = await reqSubmitOrder({ tradeNo, data });
  // },
}; //发请求拿数据
const mutations = {
  RECERIVETRADEINFOR(state, tradeInfor) {
    state.tradeInfor = tradeInfor;
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
