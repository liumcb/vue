const getters= {
  userInfo: state => state.login.userInfo,

  dictCodeList: state => state.home.dictCodeList,
  menuList: state => state.home.menuList,

  menuPageResult: state => state.system.menuPageResult,
  menuCreateResult: state => state.system.menuCreateResult,
  treeSelectListResult: state => state.system.treeSelectListResult,
  menuFindListResult: state => state.system.menuFindListResult,
  rolePageResult: state => state.system.rolePageResult,
  roleTreeListResult: state => state.system.roleTreeListResult,
  roleModifyTree:  state => state.system.roleModifyTree,
  roleCreateResult:  state => state.system.roleCreateResult,
  allUserResult:  state => state.system.allUserResult,
  selectUserResult:  state => state.system.selectUserResult,
}

export default getters;