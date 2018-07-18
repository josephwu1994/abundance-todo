/**
 * ************************************
 *
 * @module  Task
 * @author  josephwu1994
 * @date    6/17/2018
 * @description list todos and check off todos
 *
 * ************************************
 */
import React, { Component } from "react";

class Task extends Component {
  render() {
    return (
      <div id="table" style={this.props.style} className="container-fluid">
        <div className="tableProp" id="title">
          {this.props.todo.Assignment}
        </div>
        <div className="tableProp" id="priority">
          {this.props.todo.Priority}
        </div>
        <div className="tableProp" id="status">
          {this.props.todo.Status}
        </div>
        <div className="tableProp" id="dueDate">
          {this.props.todo["Due Date"]}
        </div>
      </div>
    );
  }
}

export default Task;
