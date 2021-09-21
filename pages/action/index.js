export const listTodo = () => {
    return {
      type: 'LIST_TODO',
    }
  }
  
  export const addTodo = (todo) => {
    return {
      type: 'ADD_TODO',
      todo
    }
  }