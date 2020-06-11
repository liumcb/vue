import Vue from 'vue';
import Vuex from 'vuex';
import home from './modules/home';
import login from './modules/login';
import system from './modules/system';
import getters from './getters';

// 挂载vue
Vue.use(Vuex);

// 创建vuex对象
const store =new Vuex.Store({
  modules:{
    login,
    home,
    system
  },
  getters
})

export default store;