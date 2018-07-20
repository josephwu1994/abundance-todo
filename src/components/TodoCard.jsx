import React, { Component } from "react";
import { Card, CardTitle } from "material-ui/Card";
import Checkbox from 'material-ui/Checkbox';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';

class TodoCard extends Component {
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
          onClick={() => {this.props.handleDelete(todo.id)}}
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
            onCheck={() => this.props.handleCheck(todo.id)}
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

export default TodoCard;
