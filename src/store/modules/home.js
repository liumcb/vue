import { getMenuApi } from '../../api/request'; 
//要设置的全局访问的state对象，默认初始值 
const state = { 
  title:'home页面',
  count:'0',
  vshop:'123',
  todos: [
    {id: 1, done: true, text: '我是码农'},
    {id: 2, done: false, text: '我是码农202号'},
    {id: 3, done: true, text: '我是码农202号'}
  ],
  menuList:[]
};

//自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
const mutations = {
  increment(state){
    // 更新状态
    state.count = Number(state.count) + 1;
  },
  // 获取菜单
  createMenu(state,menuList){
    state.menuList = menuList.titles;
  }
};

//自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
const actions = {
  incrementAction({commit}){
    commit("increment")
  },
  createMenuAction(context,params){
    console.log('获取的菜单的param===', params);
    // 获取菜单列表
    getMenuApi(params).then(action => {
      context.commit('createMenu', action.value)
    }).catch((err) =>{
      console.log(err);
    })
  },
};

export default {
  namespaced: true, //用于在全局引用此文里的方法时标识这一个的文件名
  state,
  mutations,
  actions
}