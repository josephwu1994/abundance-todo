import React, { Component } from "react";
import { Card, CardTitle } from "material-ui/Card";
import Toggle from "react-toggle";
import "react-toggle/style.css";

class TodoCard extends Component {
  render() {
    const todo = this.props.todo;
    const priorityColor = {
      High: "#4527A0",
      Medium: "#03A9F4",
      Low: "#9E9E9E"
    };
    return (
      <div id="table">
        <Toggle
          className="toggleBtn"
          defaultChecked={todo.Status === "Complete"}
          onChange={() => this.props.handleCheck(todo.id)}
          icons={false}
        />
        <Card style={this.props.style} className="todoContainer">
          <CardTitle
            style={{ display: "flex", alignItems: "center" }}
            titleColor={priorityColor[todo.Priority]}
            title={`${todo.Priority}`}
            titleStyle={{ marginRight: "30px" }}
            subtitle={`Due ${todo["Due Date"]}`}
            subtitleStyle={{
              fontSize: "14px",
              position: "absolute",
              left: "21%",
              top: "24px"
            }}
            children={
              <div
                className="task"
                style={{ backgroundColor: priorityColor[todo.Priority] }}
              >
                {todo.Assignment}
              </div>
            }
          />
        </Card>
      </div>
    );
  }
}

export default TodoCard;
