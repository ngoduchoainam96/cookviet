var initialState = [];

const myReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'LIST_TODO':
      return state;
    case 'ADD_TODO':
      state.push(action.todo)
      return [...state];
    default:
      return state;
  }
}

export default myReducer;