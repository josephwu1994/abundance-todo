import React, { Component } from 'react';
import { PacmanLoader } from 'react-spinners';
import { connect } from 'react-redux';
import { checkTodo, deleteTodo, initiateTodo } from '../store/actions/'

import Filter from '../components/Filter.jsx';
import TodoCard from '../components/TodoCard.jsx';
import Search from '../components/Search.jsx';

const mapStateToProps = ( store ) => {
  console.log(store);
  return ({
  todos: store.todos.todos,
})}
const mapDispatchToProps = dispatch => ({
  checkTodo: (index) => dispatch(checkTodo(index)),
  deleteTodo: (id) => dispatch(deleteTodo(id)),
  initiateTodo: (todos) => dispatch(initiateTodo(todos)),
})

class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
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
      this.props.initiateTodo(todos);
      this.setState({loading: false});
    });
  }

  filter(searchResult) {
    if (searchResult === '') this.setState({ searchResult: this.props.todos });
    else this.setState({ searchResult });
  }

  handleDelete(id) {
    this.props.deleteTodo(id);
    fetch('/deleteTodo', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({id})
    })
    .catch(err => console.error(`Failed to delete ${err}`));
  }

  handleCheck(id) {
    this.props.checkTodo(id);
    const todos = this.props.todos;
    let status = '';
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === id) {
        if (todos[i].Status === 'In Progress') status = 'Complete';
        else status = 'In Progress';
        fetch('/updateTodo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: id, Status: status })
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
      let todos = this.props.todos;
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

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
