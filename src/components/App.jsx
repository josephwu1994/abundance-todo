import React, { Component } from "react";
import Attributes from "./Attributes.jsx";
import Search from "./Search.jsx";
import Create from "./Create.jsx";
import Table from "./Table.jsx";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { PacmanLoader } from "react-spinners";

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      searchResult: []
    };
    this.addTodo = this.addTodo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.filter = this.filter.bind(this);
  }

  componentDidMount() {
    fetch("/getAll")
      .then(res => res.json())
      .then(todos => {
        this.setState({ todos });
      });
  }

  addTodo(task) {
    console.log("i got here");
    fetch("/addTodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    })
      .then(res => res.json())
      .then(json => {
        const arr = this.state.todos;
        arr.push(json);
        this.setState({ todo: arr });
      })
      .catch(err => console.log("Failed to post todo " + err));
  }

  handleChange(id) {
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

  filter(searchResult) {
    if (searchResult === "") this.setState({ searchResult: this.state.todos });
    this.setState({ searchResult });
  }

  render() {
    if (this.state.todos.length === 0) {
      return (
        <div className="App">
          <Create />
          <Search />
          <Attributes />
          <div className="loading">
            <PacmanLoader color="#4e54c8" />
          </div>
          <div className="load">Loading ... </div>
        </div>
      );
    } else {
      let displayArr = [];
      if (this.state.searchResult.length > 0)
        displayArr = this.state.searchResult;
      else displayArr = this.state.todos;
      const table = displayArr.map(todo => {
        let style = {};
        todo.Status === "Complete"
          ? (style = { boxShadow: "0 0 10px 1px rgb(13, 240, 5)" })
          : (style = { boxShadow: "0 0 10px 1px rgba(240, 6, 6, 0.945)" });
        return (
          <div className="list" key={todo.id}>
            <Toggle
              className="toggleBtn"
              defaultChecked={todo.Status === "Complete"}
              onChange={() => this.handleChange(todo.id)}
            />
            <Table style={style} todo={todo} key={todo.id} />
          </div>
        );
      });
      return (
        <div className="App">
          <Create addTodo={this.addTodo} />
          <Search todos={this.state.todos} filter={this.filter} />
          <Attributes todos={this.state.todos} filter={this.filter} />
          {table}
        </div>
      );
    }
  }
}

export default App;
