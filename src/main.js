import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 使用element
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,  // 注入到根实例中
  store,   // 将store挂载到实例中
  render: h => h(App),
}).$mount('#app')

