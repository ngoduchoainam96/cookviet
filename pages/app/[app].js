import React from 'react';
import AddTodo from '../container/addtodo'
import TodoList from '../container/todolist'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import myReducers from '../reducer/index'

const store = createStore(myReducers);
function App() {
  return (
    <Provider store={store}> 
    <div className="App container">
      <div className="row">
        <div className="col-md-5 col-md-offset-3">
          <div className="panel panel-info">
            <div className="panel-heading">
              <h3 className="panel-title">Todos</h3>
            </div>
            <AddTodo />
            <TodoList />
          </div>
        </div>
      </div>
    </div></Provider>
   
  );
}

export default App;