import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import Index from '../views/Index.vue'
import Book from '../views/book.vue'
 
Vue.use(Router)
const router = new Router({
  routes: [{
  path: '/',
  redirect: '/index'
 }, {
  path: '/login',
  name: 'Login',
  component: Login
 }, {
  path: '/index',
  name: 'Index',
  component: Index
 }, {
  path: '/book',
  name: 'Book',
  component: Book
 }]
})
 
export default router