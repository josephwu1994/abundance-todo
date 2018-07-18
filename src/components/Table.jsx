import React, { Component } from "react";

class Table extends Component {
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

export default Table;
