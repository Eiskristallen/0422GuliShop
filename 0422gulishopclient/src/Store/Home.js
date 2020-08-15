//vuex数据模块化
//这个模块就是管理home里面的数据的
import { reqCategory, reqBannerlist, reqFloor } from '@/Api';
const state = {
  categoryList: [],
  bannerList: [],
  floorList: [],
};
const getters = {
  categoryList(state) {
    return state.categoryList;
  },
  bannerList(state) {
    return state.bannerList;
  },
  floorList(state) {
    return state.floorList;
  },
};
const actions = {
  async getCategoryList({ commit }) {
    //用async函数,不用异步函数,api里面的这个函数,reqCategory这个函数返回的是一个promise
    //result就能拿到promise里面的数据
    const result = await reqCategory();
    if (result.code === 200) {
      commit('RECEIVECATEGOTYLIST', result.data);
    }
    // reqCategory().then((result) => {
    //   commit('RECEIVECATEGOTYLIST', result);
    // });
  },
  async getbannerList({ commit }) {
    //用async函数,不用异步函数,api里面的这个函数,reqCategory这个函数返回的是一个promise
    //result就能拿到promise里面的数据
    const result = await reqBannerlist();
    if (result.code === 200) {
      commit('RECEIVEBANNERLIST', result.data);
    }
    // reqCategory().then((result) => {
    //   commit('RECEIVECATEGOTYLIST', result);
    // });
  },
  async getfloorList({ commit }) {
    //用async函数,不用异步函数,api里面的这个函数,reqCategory这个函数返回的是一个promise
    //result就能拿到promise里面的数据
    const result = await reqFloor();
    if (result.code === 200) {
      commit('RECEIVEFLOORLIST', result.data);
    }
    // reqCategory().then((result) => {
    //   commit('RECEIVECATEGOTYLIST', result);
    // });
  },
}; //发请求拿数据
const mutations = {
  //修改数据
  RECEIVECATEGOTYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
  RECEIVEBANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },

  RECEIVEFLOORLIST(state, floorList) {
    state.floorList = floorList;
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
