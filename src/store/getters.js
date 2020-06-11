const getters= {
  userInfo: state => state.login.userInfo,

  dictCodeList: state => state.home.dictCodeList,
  menuList: state => state.home.menuList,
  ashop:state => state.home.vshop+'哈哈',
  todos: state => state.home.todos.filter(todo => todo.done),

  menuPageResult: state => state.system.menuPageResult
}

export default getters;