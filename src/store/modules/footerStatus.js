//要设置的全局访问的state对象 
const state = { 
  //要设置的初始属性值
  showFooter: true,
  changableNum:0
};

//实时监听state值的变化(最新状态)
const getters = {   
  isShow(state) {  //方法名随意,主要是来承载变化的showFooter的值
    console.log('getters====state', state);
    return state.showFooter
  },
  getChangedNum(){  //方法名随意,主要是用来承载变化的changableNum的值
    return state.changebleNum
  }
};

//自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
const mutations = {
  show(state) {   
    console.log('show中的state===', state);
    state.showFooter = true;
  },
  hide(state) {  //同上
    console.log('hide中的state===', state);
    state.showFooter = false;
  },
  newNum(state,sum){ //同上，这里面的参数除了state之外还传了需要增加的值sum
    state.changableNum+=sum;
  }
};

//自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
const actions = {
  hideFooter(context) {  
    console.log('actions中的context', context);
    context.commit('hide');
  },
  showFooter(context) {  //同上注释
    context.commit('show');
  },
  getNewNum(context,num){   //同上注释，num为要变化的形参
    context.commit('newNum',num)
   }
};

export default {
  namespaced: true, //用于在全局引用此文里的方法时标识这一个的文件名
  state,
  getters,
  mutations,
  actions
}