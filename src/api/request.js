import { post } from "./config";

export function getMenuApi(params){
  return post('/menu/indexMenuAndPermission', params);
}

