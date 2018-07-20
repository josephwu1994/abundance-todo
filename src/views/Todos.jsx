import React, { Component } from 'react';
import { PacmanLoader } from 'react-spinners';
import { connect } from 'react-redux';
import { checkTodo, deleteTodo } from '../store/actions/index'

import Filter from '../components/Filter.jsx';
import TodoCard from '../components/TodoCard.jsx';
import Search from '../components/Search.jsx';

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
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    fetch('/getAll')
      .then(res => res.json())
      .then(todos => {
        this.setState({ todos, loading: false });
      });
  }

  componentWillReceiveProps(prop) {
    if (prop.newTodo.id !== undefined) {
      const todos = this.state.todos;
      todos.push(prop.newTodo);
      this.setState({ todos });
      this.props.handleNewTodo({});
    }
  }

  filter(searchResult) {
    if (searchResult === '') this.setState({ searchResult: this.state.todos });
    else this.setState({ searchResult });
  }

  handleDelete(id) {
    const todos = this.state.todos.filter(todo => {
      return todo.id !== id;
    })
    this.setState({todos});
    fetch('/deleteTodo', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({id})
    })
    .catch(err => console.error(`Failed to delete ${err}`));
  }

  handleCheck(id) {
    const todos = this.state.todos;
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === id) {
        if (todos[i].Status === 'In Progress') todos[i].Status = 'Complete';
        else todos[i].Status = 'In Progress';
        this.setState({
          todos: [...todos.slice(0, i), todos[i], ...todos.slice(i + 1)]
        });
        fetch('/updateTodo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: todos[i].id, Status: todos[i].Status })
        })
        .catch(err => console.log('failed to update ' + err));
        break;
      }
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <div className='todosContainer'>
          <div className='loading'>
            <PacmanLoader color='#4e54c8' />
          </div>
          <div className='load'>Loading ... </div>
        </div>
      );
    } else {
      let todos = this.state.todos;
      if (this.state.searchResult.length > 0) todos = this.state.searchResult;
      const displayArr = todos.map(todo => {
        let style = {};
        if (todo.Status === 'Complete') {
          style.backgroundColor='rgba(0, 0, 0, 0.3)';
        }
        return (
          <div className='list' key={todo.id}>
            <TodoCard
              style={style}
              todo={todo}
              handleCheck={this.handleCheck}
              handleDelete={this.handleDelete}
            />
          </div>
        );
      });
      return (
        <div className='todosContainer'>
          <Filter todos={todos} filter={this.filter} />
          <Search todos={todos} filter={this.filter} />
          <div className='listContainer'>{displayArr}</div>
        </div>
      );
    }
  }
}

export default connect({}, {deleteTodo, checkTodo})(Todos);
