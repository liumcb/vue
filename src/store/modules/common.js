//要设置的全局访问的state对象，默认初始值 
const state = { 
  recordInfo:{}
};

//自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
const mutations = {
  saveRecord(state,result){
    state.recordInfo = result.recordInfo;
  }
};

//自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
const actions = {
  // 获取代码表
  saveRecordAction(context,params){
    context.commit('saveRecord', params)
  }
};

export default {
  namespaced: true, //用于在全局引用此文里的方法时标识这一个的文件名
  state,
  mutations,
  actions
}