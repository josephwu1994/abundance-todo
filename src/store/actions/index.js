
export const addTodo = todo => ({
  type: 'ADD_TODO',
  todo,
});

export const checkTodo = index => ({
  type: 'CHECK_TODO',
  index,
});

export const deleteTodo = id => ({
  type: 'DELETE_TODO',
  id,
});

export const initiateTodo = todos => ({
  type: 'INITIATE_TODO',
  todos,
});
