import _ from 'lodash';

const defaultState = {
  todos: [],
};

const todos = (state = _.cloneDeep(defaultState), action) => {
  switch (action.type) {
    case 'INITIATE_TODO': {
      return { todos: action.todos };
    }
    case 'ADD_TODO': {
      return Object.assign({}, state, {
        todos: [...state.todos, ...action.todo],
      });
    }
    case 'CHECK_TODO': {
      const todo = state.todos.slice()[action.index]
      if (todo.Status === 'In Progress') todo.Status = 'Complete';
      else todo.Status = 'In Progress';
      return ({
        todos: [...state.todos.slice(0, action.index), todo, ...state.todos.slice(action.index + 1)]
      });
    }
    case 'DELETE_TODO': {
      const arr = state.todos.filter((todo) => {
        return todo.id !== action.id;
      });
      return ({
        todos: arr,
      });
    }

    default:
      return state;
  }
};
export default todos;
