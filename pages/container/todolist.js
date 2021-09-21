import React, { Component } from 'react';
import { connect } from 'react-redux';
import Todo from '../component/todo'

class TodoList extends Component {
  render() {
    var elements = this.props.todos.map((todo, index) => {
      return <Todo todo={todo} key={index} />
    })
    return (
      <div className="panel-footer">
        <ul>
         {elements}
        </ul>
      </div>
    );
  }
}

var mapStateToProps = state => {
  return {
    todos: state.todos
  }
}

export default connect(mapStateToProps, null)(TodoList);