import React, { Component } from "react";
import { Card, CardTitle } from "material-ui/Card";
import Checkbox from 'material-ui/Checkbox';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';
import { connect } from 'react-redux';
import { checkTodo, deleteTodo } from '../store/actions/'

const mapStateToProps = ( store ) => ({
  todos: store.todos.todos,
})

const mapDispatchToProps = dispatch => ({
  checkTodo: (index) => dispatch(checkTodo(index)),
  deleteTodo: (id) => dispatch(deleteTodo(id)),
})

class TodoCard extends Component {
  constructor(){
    super();
    this.handleCheck = this.handleCheck.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === id) {
        fetch('/updateTodo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: id, Status: todos[i].Status })
        })
        .catch(err => console.log('failed to update ' + err));
        break;
      }
    }
  }

  render() {
    const todo = this.props.todo;
    const titleColor = {
      'In Progress': 'rgba(0, 0, 0, 0.65)',
      'Complete' : 'rgba(0, 0, 0, 0.2',
    }
    const priorityColor = {
      High: "#4527A0",
      Medium: "#03A9F4",
      Low: "#9E9E9E"
    };
    const buttonShow ={
      'Complete': {display: 'block'},
      'In Progress': {display: 'none'},
    }
    return (
      <div id="table">
        <FloatingActionButton 
          secondary={true}
          mini={true} 
          style={{
            ...buttonShow[todo.Status],
            marginLeft: '-50px',
            marginRight: '10px',
          }}
          onClick={() => {this.handleDelete(todo.id)}}
        >
          <DeleteForever />
        </FloatingActionButton>
        <Card 
          style={{...this.props.style, borderRadius: '15px'}} 
          className="todoContainer"
          containerStyle={{padding:'0px', display:'flex', alignItems: "center"}}
        >
          <Checkbox
            className='toggleBtn'
            checked={todo.Status==='Complete'}
            onCheck={() => {this.handleCheck(todo.id)}}
            style={{width: '20px'}}
          />
          <CardTitle
            style={{ display: "flex", alignItems: "center", flexGrow: '1' }}
            titleColor={titleColor[todo.Status]}
            title={`${todo.Assignment}`}
            titleStyle={{ marginRight: "30px" }}
            subtitle={`Due ${todo["Due Date"]}`}
            subtitleStyle={{
              fontSize: "14px",
              position: "absolute",
              right: "25%",
              top: "24px"
            }}
            children={
              <div
                className="task"
                style={{ backgroundColor: priorityColor[todo.Priority] }}
              >
                {todo.Priority}
              </div>
            }
          />
        </Card>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoCard);
