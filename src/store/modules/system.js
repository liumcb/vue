import Request from '@/api/request';
import { Message } from 'element-ui';
//要设置的全局访问的state对象，默认初始值 
const state = { 
  menuPageResult:[],
  menuCreateResult:{},
  treeSelectListResult:[],
  menuFindListResult:[],
  rolePageResult:[],
  roleTreeListResult:[],
  roleModifyTree:[],
  roleCreateResult:{},
  allUserResult:[],
  selectUserResult: []
};

//自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
const mutations = {
  // 获取菜单
  getMenuPage(state,result){
    state.menuPageResult = result;
  },
  // 添加菜单
  menuCreate(state,result){
    state.menuCreateResult = result;
  },
  // tree
  quaryTreeList(state,result){
    function modify(result){
      result.map(item => {
        if(item.children){
          modify(item.children);
        }
        item.value = item.id;
        item.label = item.name;
        return item;
      });
      return result;
    }
    modify(result);
    console.log('修改后的result===', result);
    const resultArr = [{
      value: 0,
      key: 0,
      label: '顶级',
      children: result
    }];
    console.log('resultArr=', resultArr);
    state.treeSelectListResult = resultArr;
  },
  // 获取菜单列表
  queryMenuList(state,result){
    state.menuFindListResult = result;
  },
  // 角色菜单
  rolePage(state,result){
    state.rolePageResult = result;
  },
  // 获取所有角色列表
  roleTree(state,result){
    state.roleTreeListResult = result;
    console.log('角色result===', result);

    if(result){
      result.map(child => {
        child.value = child.id;
        child.label = child.name;
        if(child.id !== 0){
          result.map(parent => {
            if(parent.id === child.pId){
              let childArray = parent.children;
              if(!parent.children){
                childArray = [];
              }
              childArray.push(child);
              parent.children = childArray;
            }
          })
        }
      })
    }
    const roleResult = result.filter(item => item.id === 0);
    console.log('修改后的result=', result);

    console.log('roleResult=',roleResult);
    state.roleModifyTree = roleResult;
  },
  // 添加角色
  roleCreate(state,result){
    state.roleCreateResult = result;
  },
  // 获取所有用户
  allUser(state,result){
    console.log('result====', result)
    if(result && result.value){
      result.value.map((item) => {
        item.key = item.id;
        item.label = item.userName;
      })
    }
    console.log('result.value=', result.value);
    state.allUserResult = result.value;
  },
  // 获取已选用户
  selectUser(state,result){
    if(result && result.value){
      const selectArr = [];
      result.value.map(item => {
        return selectArr.push(item.id)
      })
      console.log('已选用户selectArr=', selectArr);
      state.selectUserResult = selectArr;
    }
  }
};

//自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
const actions = {
  // 获取tree
  quaryTreeAction(context,params){
    Request.queryAllowAuthTreeApi(params).then(result => {
      context.commit('quaryTreeList', result);
    }).catch((err) =>{
      console.log(err);
    })
  },
  // 获取菜单列表
  getMenuPageAction(context,params){
    Request.getMenuPageApi(params).then(result => {
      context.commit('getMenuPage', result)
    }).catch((err) =>{
      console.log(err);
    })
  },
  // 添加菜单
  menuCreateAction(context,params){
    console.log('添加菜单params====',params);
    Request.menuCreateApi(params.data).then(result => {
      context.commit('menuCreate', result);
      console.log('添加菜单的result====', result);
      // 调用接口-成功之后刷新页面
      if(result && result.success){
        Request.getMenuPageApi(params.searchParam).then(result => {
          context.commit('getMenuPage', result)
        }).catch((err) =>{
          console.log(err);
        })
      }else{
        Message.error({ message: result.errorMsg });
      }
    }).catch((err) =>{
      console.log(err);
    })
  },
  // 删除菜单
  menuDeleteAction(context,params){
    Request.menuDeleteApi(params.data).then(result => {
      // 调用接口-成功之后刷新页面
      if(result && result.success){
        Request.getMenuPageApi(params.searchParam).then(result => {
          context.commit('getMenuPage', result)
        }).catch((err) =>{
          console.log(err);
        })
      }else{
        Message.error({ message: result.errorMsg });
      }
    }).catch((err) =>{
      console.log(err);
    })
  },
  // 修改菜单
  menuModifyAction(context,params){
    Request.menuModifyApi(params.data).then(result => {
      context.commit('menuCreate', result);
      // 调用接口-成功之后刷新页面
      if(result && result.success){
        Request.getMenuPageApi(params.searchParam).then(result => {
          context.commit('getMenuPage', result)
        }).catch((err) =>{
          console.log(err);
        })
      }else{
        Message.error({ message: result.errorMsg });
      }
    }).catch((err) =>{
      console.log(err);
    })
  },
  // 获取菜单列表
  queryMenuListAction(context,params){
    Request.menuFindListApi(params).then(result => {
      context.commit('queryMenuList', result)
    }).catch((err) =>{
      console.log(err);
    })
  },
  // 角色列表
  rolePageAction(context,params){
    Request.rolePageApi(params).then(result => {
      context.commit('rolePage',result)
    }).catch((err) => {
      console.log(err);
    })
  },
  // 获取所有角色列表
  roleTreeListAction(context,params){
    Request.roleTreeListApi(params).then(result => {
      context.commit('roleTree',result)
    }).catch((err) => {
      console.log(err);
    })
  },
  // 添加角色
  roleCreateAction(context,params){
    console.log('添加角色params=', params);
    Request.roleCreateApi(params.data).then(result => {
      context.commit('roleCreate', result);
      // 调用接口-成功之后刷新页面
      if(result && result.success){
        Request.rolePageApi(params.searchParam).then(result => {
          context.commit('rolePage', result)
        }).catch((err) =>{
          console.log(err);
        })
      }else{
        Message.error({ message: result.errorMsg });
      }
    }).catch((err) => {
      console.log(err);
    })
  },
  // 删除角色
  deleteRoleAction(context,params){
    Request.deleteRoleCreateApi(params.data).then(result => {
      // 调用接口-成功之后刷新页面
      if(result && result.success){
        Request.rolePageApi(params.searchParam).then(result => {
          context.commit('rolePage', result)
        }).catch((err) =>{
          console.log(err);
        })
      }else{
        Message.error({ message: result.errorMsg });
      }
    }).catch((err) =>{
      console.log(err);
    })
  },
  // 获取所有用户
  allUserAction(context,params){
    Request.allUserApi(params).then(result => {
      context.commit('allUser',result)
    }).catch((err) => {
      console.log(err);
    })
  },
  // 获取已选用户
  selectUserAction(context,params){
    Request.allUserApi(params).then(result => {
      context.commit('selectUser',result)
    }).catch((err) => {
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