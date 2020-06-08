//要设置的全局访问的state对象，默认初始值 
const state = { 
  blogTitle: '迩伶贰blog',
  views: 10,
  blogNumber: 100,
  total: 0,
  todos: [
    {id: 1, done: true, text: '我是码农'},
    {id: 2, done: false, text: '我是码农202号'},
    {id: 3, done: true, text: '我是码农202号'}
  ]
};

//实时监听state值的变化(最新状态)
const getters = {   
  getToDo: state => {
    return state.todos.filter(todo => todo.done)
  }
};

//自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
const mutations = {

};

//自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
const actions = {

};

export default {
  namespaced: true, //用于在全局引用此文里的方法时标识这一个的文件名
  state,
  getters,
  mutations,
  actions
}