import Vue from 'vue';
import Vuex from 'vuex';
import footerStatus from './modules/footerStatus';
import home from './modules/home';

// 挂载vue
Vue.use(Vuex);

// 创建vuex对象
const store =new Vuex.Store({
  modules:{
    footerStatus,
    home
  }
})

export default store