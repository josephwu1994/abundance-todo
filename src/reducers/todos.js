import _ from 'lodash';

const defaultState = {
  todos: [],
};

const todos = (state = _.cloneDeep(defaultState), action) => {
  switch (action.type) {
    case 'INITIATE_TODO': {
      return Object.assign({}, { todos: action.todos });
    }
    case 'ADD_TODO': {
      const updatedTodos = _.cloneDeep(state.todos);
      updatedTodos.push(action.todo);
      return Object.assign({}, { todos: updatedTodos },);
    }
    case 'CHECK_TODO': {
      const updatedTodoIndex = _.findIndex(state.todos, { id: action.id });
      const updatedTodos = _.cloneDeep(state.todos);
      if (updatedTodos[updatedTodoIndex].Status === 'In Progress') updatedTodos[updatedTodoIndex].Status = 'Complete';
      else updatedTodos[updatedTodoIndex].Status = 'In Progress';
      return { todos: updatedTodos };
    }
    case 'DELETE_TODO': {
      const arr = state.todos.filter((todo) => {
        return todo.id !== action.id;
      });
      return Object.assign({}, { todos: arr });
    }

    default:
      return state;
  }
};
export default todos;
