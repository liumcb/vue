import Vue from 'vue';
import Vuex from 'vuex';
import home from './modules/home';
import login from './modules/login';
import getters from './getters';

// 挂载vue
Vue.use(Vuex);

// 创建vuex对象
const store =new Vuex.Store({
  modules:{
    home,
    login
  },
  getters
})

export default store;