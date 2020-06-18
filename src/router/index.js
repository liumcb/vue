import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue';
import Home from '../views/home.vue';
// 系统管理
import MenuManagement from '../views/system/menuManagement.vue';
import RoleManagement from '../views/system/roleManagement.vue';

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
      path: '/system/menuManagement',
      name: '菜单管理',
      component: MenuManagement,
    },
    {
      path: '/system/roleManagement',
      name: '角色信息',
      component: RoleManagement,
    }
  ]
 }]
})
 
export default router