import _ from 'lodash';

const defaultState = {
  todos: [],
};

const todos = (state = _.cloneDeep(defaultState), action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return Object.assign({}, state, {
        todos: [...this.state.todos, ...action.todo],
      }),
    case 'CHECK_TODO':
      const todo = this.state.todos.slice()[action.index]
      if (todo.Status === 'In Progress') todo.Status = 'Complete';
      else todo.Status = 'In Progress';
      return {
        todos: [...this.state.todos.slice(0, action.index), todo, ...this.state.todos.slice(action.index + 1)]
      },
    case 'DELETE_TODO':
      const todos = this.state.todos.filter(todo => {
        return todo.id !== action.id;
      })
      return {
        todos
      },
    default:
      return state
  }
};
export default todos;