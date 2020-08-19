//vuex数据模块化
//用户的临时身份标识
//在user state存一份,为了以后获取比较方便
//用户的身份标识是存储在永久的地方(localStorage),但是尽量不要更改
// 看localstorage,有就用,没有就创建
import getUserTempId from '@/Utils/UserAbout.js';
const state = {
  userTempId: getUserTempId(),
};
const getters = {};
const actions = {}; //发请求拿数据
const mutations = {};
export default {
  state,
  mutations,
  actions,
  getters,
};
