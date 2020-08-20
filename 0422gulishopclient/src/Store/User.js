//vuex数据模块化
//用户的临时身份标识
//在user state存一份,为了以后获取比较方便
//用户的身份标识是存储在永久的地方(localStorage),但是尽量不要更改
// 看localstorage,有就用,没有就创建
import getUserTempId from '@/Utils/UserAbout.js';
import { reqRegister, reqLogin } from '@/Api';
import { reqLogout } from '../Api';
const state = {
  userTempId: getUserTempId(),
  userInfor: JSON.parse(localStorage.getItem('USERINFOR_KEY')) || {},
};
const getters = {};
const actions = {
  async newRegister({ commit }, userInfor) {
    const result = await reqRegister(userInfor);
    return result.code === 200 ? 'registed' : Promise.reject(new Error('fail'));
  },
  async reqLogin({ commit }, userInfor) {
    const result = await reqLogin(userInfor);
    if (result.code === 200) {
      commit('RECEIVEUSERINFOR', result.data);
      localStorage.setItem('USERINFOR_KEY', JSON.stringify(result.data));
      return 'success';
    } else {
      return Promise.reject(new Error('fail'));
    }
  },
  async reqLogout({ commit }) {
    const result = await reqLogout();
    if (result.code === 200) {
      localStorage.removeItem('USERINFOR_KEY');
      commit('REMOVEUSERINFOR');
      return 'success';
    } else {
      return Promise.reject(new Error('fail'));
    }
  },
  // getCode({ commit }) {
  //   const result = reqCode();
  //   return result;
  // },
}; //发请求拿数据
const mutations = {
  RECEIVEUSERINFOR(state, userInfor) {
    state.userInfor = userInfor;
  },
  REMOVEUSERINFOR(state) {
    state.userInfor = {};
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
