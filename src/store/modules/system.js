import { getMenuPageApi } from '../../api/request'; 
//要设置的全局访问的state对象，默认初始值 
const state = { 
  menuPageResult:[]
};

//自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
const mutations = {
  // 获取菜单
  getMenuPage(state,result){
    state.menuPageResult = result;
  }
};

//自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
const actions = {
  getMenuPageAction(context,params){
    // 获取菜单列表
    getMenuPageApi(params).then(result => {
      context.commit('getMenuPage', result)
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