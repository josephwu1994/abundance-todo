import React, { Component } from "react";
import { PacmanLoader } from "react-spinners";

import Filter from "../components/Filter.jsx";
import TodoCard from "../components/TodoCard.jsx";
import Search from "../components/Search.jsx";

class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      todos: [],
      searchResult: []
    };
    this.filter = this.filter.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  componentDidMount() {
    fetch("/getAll")
      .then(res => res.json())
      .then(todos => {
        this.setState({ todos, loading: false });
      });
  }

  componentWillReceiveProps(prop) {
    console.log("got here");
    if (typeof prop.id !== undefined) {
      const todos = this.state.todos;
      todos.push(prop.newTodo);
      this.setState({ todos });
    }
  }

  filter(searchResult) {
    console.log(searchResult);
    if (searchResult === "") this.setState({ searchResult: this.state.todos });
    else this.setState({ searchResult });
  }

  handleCheck(id) {
    const obj = this.state.todos;
    for (let i = 0; i < obj.length; i++) {
      if (obj[i].id === id) {
        if (obj[i].Status === "In Progress") obj[i].Status = "Complete";
        else obj[i].Status = "In Progress";
        this.setState({
          todos: [...obj.slice(0, i), obj[i], ...obj.slice(i + 1)]
        });
        fetch("/updateTodo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: obj[i].id, Status: obj[i].Status })
        }).catch(err => console.log("failed to update " + err));
        break;
      }
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="todosContainer">
          <div className="loading">
            <PacmanLoader color="#4e54c8" />
          </div>
          <div className="load">Loading ... </div>
        </div>
      );
    } else {
      let todos = this.state.todos;
      if (this.state.searchResult.length > 0) todos = this.state.searchResult;
      const displayArr = todos.map(todo => {
        let style = {};
        if (todo.Status === "Complete")
          style.boxShadow = "#64B5F6 0px 1px 6px, #64B5F6 0px 1px 4px";
        return (
          <div className="list" key={todo.id}>
            <TodoCard
              style={style}
              todo={todo}
              handleCheck={this.handleCheck}
            />
          </div>
        );
      });
      return (
        <div className="todosContainer">
          <Filter todos={todos} filter={this.filter} />
          <Search todos={todos} filter={this.filter} />
          <div className="listContainer">{displayArr}</div>
        </div>
      );
    }
  }
}

export default Todos;
