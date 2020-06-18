import { getMenuApi, dictCodeApi } from '../../api/request'; 
//要设置的全局访问的state对象，默认初始值 
const state = { 
  menuList:[],
  dictCodeList:[]
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
  },
  // 获取代码表====将数组转换为对象数组
  queryDictList(state,dictCodeList){
    const getAllDisctCodeObj = {};
    dictCodeList.forEach((item) => {
      const array = getAllDisctCodeObj[item.dictGroup] || [];
      array.push(item);
      getAllDisctCodeObj[item.dictGroup] = array;
    });
    state.dictCodeList = getAllDisctCodeObj
  }
};

//自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
const actions = {
  incrementAction({commit}){
    commit("increment")
  },
  // 获取菜单列表
  createMenuAction(context,params){
    getMenuApi(params).then(action => {
      context.commit('createMenu', action.value)
    }).catch((err) =>{
      console.log(err);
    })
  },
  // 获取代码表
  queryDictListAction(context,params){
    dictCodeApi(params).then(action => {
      context.commit('queryDictList', action.value)
    }).catch((err) =>{
      console.log(err);
    })
  }
};

export default {
  namespaced: true, //用于在全局引用此文里的方法时标识这一个的文件名
  state,
  mutations,
  actions
}