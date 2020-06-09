const getters= {
  ashop:state => state.home.vshop+'哈哈',
  todos: state => state.home.todos.filter(todo => todo.done)
}

export default getters;