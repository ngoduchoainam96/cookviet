import { combineReducers } from 'redux'
import todos from './todos'

const myReducers  = combineReducers({
  todos
});

export default myReducers;