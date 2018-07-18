import React, { Component } from "react";

class Attributes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      priority: false,
      status: false,
      due: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * @param {object} e click event
   * @description arrange todos depends on the attribute clicked
   */
  handleClick(e) {
    const todos = this.props.todos;
    let arr = [];
    if (e.target.value === "priority") {
      if (!this.state.priority) {
        todos.forEach(todo => {
          if (todo.Priority === "High") arr.push(todo);
        });
        todos.forEach(todo => {
          if (todo.Priority === "Medium") arr.push(todo);
        });
        todos.forEach(todo => {
          if (todo.Priority === "Low") arr.push(todo);
        });
        this.setState({
          todos: arr,
          priority: true,
          status: false,
          due: false
        });
      } else {
        arr = this.state.todos.reverse();
        this.setState({ todos: arr, priority: false });
      }
    } else if (e.target.value === "status") {
      if (!this.state.status) {
        todos.forEach(todo => {
          if (todo.Status === "Complete") arr.push(todo);
        });
        todos.forEach(todo => {
          if (todo.Status === "In Progress") arr.push(todo);
        });
        this.props.filter(arr);
        this.setState({
          todos: arr,
          status: true,
          priority: false,
          due: false
        });
      } else {
        arr = this.state.todos.reverse();
        this.setState({ todos: arr, status: false });
      }
    } else {
      if (!this.state.due) {
        const x = "Due Date";
        arr = todos.sort((a, b) => {
          if (parseInt(a[x].slice(0, 4)) === parseInt(b[x].slice(0, 4))) {
            if (parseInt(a[x].slice(5, 7)) === parseInt(b[x].slice(5, 7))) {
              if (parseInt(a[x].slice(-2)) === parseInt(b[x].slice(-2))) {
                return true;
              } else return parseInt(a[x].slice(-2)) - parseInt(b[x].slice(-2));
            } else
              return parseInt(a[x].slice(5, 7)) - parseInt(b[x].slice(5, 7));
          } else return parseInt(a[x].slice(0, 4)) - parseInt(b[x].slice(0, 4));
        });
        this.setState({
          todos: arr,
          due: true,
          status: false,
          priority: false
        });
      } else {
        arr = this.state.todos.reverse();
        this.setState({ todos: arr, due: false });
      }
    }
    this.props.filter(arr);
  }

  render() {
    return (
      <div id="attr" className="container-fluid">
        <div className="titleAttr">Title</div>
        <button
          type="button"
          id="priorityAttr"
          value="priority"
          onClick={this.handleClick}
          className="btn btn-outline-primary"
        >
          Priority
        </button>
        <button
          type="button"
          id="statusAttr"
          value="status"
          onClick={this.handleClick}
          className="btn btn-outline-primary"
        >
          Status
        </button>
        <button
          type="button"
          id="duedateAttr"
          value="due"
          onClick={this.handleClick}
          className="btn btn-outline-primary"
        >
          Due Date
        </button>
      </div>
    );
  }
}

export default Attributes;
