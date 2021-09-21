import React, { Component } from 'react';

class Todo extends Component {
  render() {
    return (
      <li>{this.props.todo}</li>
    );
  }
}

export default Todo;