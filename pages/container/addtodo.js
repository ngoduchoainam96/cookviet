import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addTodo } from '../action/index'

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtName: ''
    }
  }

  handleChange = (event) => {
    let value = event.target.value;
    this.setState({txtName: value})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let todo = this.state.txtName;
    this.props.onSubmit(todo);
  }

  render() {
    return (
      <div className="panel-body">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="txtName"
              onChange={this.handleChange}
             />
          </div>
          <button type="submit" className="btn btn-primary">Add todo</button>
        </form>
      </div>
    );
  }
}

var mapDispatchToProps = (dispatch, props) => {
  return {
    onSubmit: (todo) => {
      dispatch(addTodo(todo))
    }
  }
}

export default connect(null, mapDispatchToProps)(AddTodo);