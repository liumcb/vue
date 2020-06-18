import { post } from "./config";

// 全局代码表  
export function dictCodeApi(params){
  return post('/dictCode/findList', params);
}

/** ====================== 菜单管理 ==================== */
// 获取菜单
export function getMenuApi(params){
  return post('/menu/indexMenuAndPermission', params);
}
// 获取菜单管理列表
export function getMenuPageApi(params){
  return post('/menu/findPage', params);
}
// 添加菜单
export function menuCreateApi(params){
  return post('/menu/create', params);
}
// 修改菜单  
export function menuModifyApi(params){
  return post('/menu/updateByCondition', params);
}
// 删除菜单  
export function menuDeleteApi(params){
  return post('/menu/deleteByPrimaryKey', params);
}
// tree
export function queryAllowAuthTreeApi(params){
  return post('/menu/queryAllowAuthTree', params);
}
// 获取父级列表
export function menuFindListApi(params){
  return post('/menu/findList', params);
}

/** ====================== 角色管理 ==================== */
// 获取父级列表
export function rolePageApi(params){
  return post('/role/findPage', params);
}
// 获取所有角色列表  
export function roleTreeListApi(params){
  return post('/role/roleTreeList', params);
}
// 添加角色
export function roleCreateApi(params){
  return post('/role/create', params);
}
// 删除角色
export function deleteRoleCreateApi(params){
  return post('/role/deleteByPrimaryKey', params);
} 
// 获取所有用户  
export function allUserApi(params){
  return post('/role/findUsersList', params);
}

export default{
  dictCodeApi,
  getMenuApi,
  getMenuPageApi,
  menuCreateApi,
  menuModifyApi,
  menuDeleteApi,
  queryAllowAuthTreeApi,
  menuFindListApi,
  rolePageApi,
  roleTreeListApi,
  roleCreateApi,
  deleteRoleCreateApi,
  allUserApi
}