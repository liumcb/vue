import { post } from "./config";

// 全局代码表  
export function dictCodeApi(params){
  return post('/dictCode/findList', params);
}
// 获取菜单
export function getMenuApi(params){
  return post('/menu/indexMenuAndPermission', params);
}
// 获取菜单管理  
export function getMenuPageApi(params){
  return post('/menu/findPage', params);
}

