import React, { Component } from "react";
import Input from "./Input.jsx";
import Todos from "./Todos.jsx";
import CSS from "./views.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodo: {}
    };
    this.handleNewTodo = this.handleNewTodo.bind(this);
  }

  handleNewTodo(newTodo) {
    this.setState({ newTodo });
  }

  render() {
    return (
      <div className="mainContainer">
        <Input handleNewTodo={this.handleNewTodo} />
        <Todos newTodo={this.state.newTodo} handleNewTodo={this.handleNewTodo} />
      </div>
    );
  }
}

export default Home;
