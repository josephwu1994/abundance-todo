const defaultState = {
  todos: [],
};

const todos = (state = Object.assign({}, defaultState), action) => {
  switch (action.type) {
    case 'INITIATE_TODO': {
      return Object.assign({}, { todos: action.todos });
    }
    case 'ADD_TODO': {
      const arr = state.todos.slice();
      arr.push(action.todo);
      return { todos: arr };
    }
    case 'CHECK_TODO': {
      const index = state.todos.findIndex(todo => todo.id === action.id);
      const updatedTodos = state.todos;
      if (updatedTodos[index].Status === 'In Progress') updatedTodos[index].Status = 'Complete';
      else updatedTodos[index].Status = 'In Progress';
      return { todos: [...updatedTodos.slice(0, index), updatedTodos[index], ...updatedTodos.slice(index + 1)] };
    }
    case 'DELETE_TODO': {
      const afterDeletedTodo = state.todos.filter(todo => todo.id !== action.id);
      return { todos: afterDeletedTodo };
    }
    default:
      return state;
  }
};
export default todos;
