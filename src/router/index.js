import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue';
import Home from '../views/home.vue';
import ComponyInfoManage from '../views/componyinfomanage.vue';
import PostInfoManage from '../views/postinfomange.vue';
import OrderInfoManage from '../views/orderinfomange.vue';
import PostType from '../views/postinfomange.vue';

// 解决多次点击同一个router报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 挂载router
Vue.use(Router)

const router = new Router({
  routes: [{
  path: '/',
  redirect: '/home'
 }, {
  path: '/login',
  name: 'Login',
  component: Login
 },{
  path: '/home',
  name: 'Home',
  component: Home,
  children:[
    {
      path: '/componyinfomanage',
      name: '企业信息',
      component: ComponyInfoManage,
    },
    {
      path: '/postinfomange',
      name: '岗位信息',
      component: PostInfoManage,
    },
    {
      path: '/orderinfomange',
      name: '订单信息',
      component: OrderInfoManage,
    },
    {
      path: '/datamangeinfo',
      name: '订单信息',
      component: PostType,
    },
  ]
 }]
})
 
export default router