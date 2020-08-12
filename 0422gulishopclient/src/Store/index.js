import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
// 把这俩合并到state里面,方便集中管理
import user from './User';
import home from './Home';

const state = {};
const getters = {};
const actions = {}; //发请求拿数据
const mutations = {}; //actions调用mutation吧数据放进state

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  //modules属性就是用来合并小的store到最后的总的store里面
  modules: {
    user,
    home,
  },
});
