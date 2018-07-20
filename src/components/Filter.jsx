import React, { Component } from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      value: null,
      order: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeOrder = this.handleChangeOrder.bind(this);
  }

  handleChangeOrder(e, i, order) {
    if (this.state.order !== order)
      this.props.filter(this.state.todos.reverse());
    this.setState({ order });
  }

  handleChange(e, value) {
    const todos = this.props.todos;
    let arr = [];
    if (value === 0) {
      todos.forEach(todo => {
        if (todo.Priority === "High") arr.push(todo);
      });
      todos.forEach(todo => {
        if (todo.Priority === "Medium") arr.push(todo);
      });
      todos.forEach(todo => {
        if (todo.Priority === "Low") arr.push(todo);
      });
      if (this.state.order === 0) {
        arr = arr.reverse();
      }
      this.setState({
        todos: arr,
        value: 0
      });
    } else if (value === 1) {
      todos.forEach(todo => {
        if (todo.Status === "Complete") arr.push(todo);
      });
      todos.forEach(todo => {
        if (todo.Status === "In Progress") arr.push(todo);
      });
      if (this.state.order === 0) {
        arr = arr.reverse();
      }
      this.setState({
        todos: arr,
        value: 1
      });
    } else {
      const x = "Due Date";
      arr = todos.sort((a, b) => {
        if (parseInt(a[x].slice(0, 4)) === parseInt(b[x].slice(0, 4))) {
          if (parseInt(a[x].slice(5, 7)) === parseInt(b[x].slice(5, 7))) {
            if (parseInt(a[x].slice(-2)) === parseInt(b[x].slice(-2))) {
              return true;
            } else return parseInt(a[x].slice(-2)) - parseInt(b[x].slice(-2));
          } else return parseInt(a[x].slice(5, 7)) - parseInt(b[x].slice(5, 7));
        } else return parseInt(a[x].slice(0, 4)) - parseInt(b[x].slice(0, 4));
      });
      if (this.state.order === 1) {
        arr = arr.reverse();
      }
      this.setState({
        todos: arr,
        value: 2
      });
    }
    this.props.filter(arr);
  }

  render() {
    return (
      <div className="filterContainer">
        <SelectField
          style={{ width: "20%" }}
          floatingLabelText="Filter By"
          value={this.state.value}
          onChange={this.handleChange}
        >
          <MenuItem value={0} primaryText="Priority" />
          <MenuItem value={1} primaryText="Status" />
          <MenuItem value={2} primaryText="Due Date" />
        </SelectField>
        <SelectField
          style={{ width: "20%" }}
          floatingLabelText="Order"
          value={this.state.order}
          onChange={this.handleChangeOrder}
        >
          <MenuItem value={0} primaryText="Ascending" />
          <MenuItem value={1} primaryText="Descending" />
        </SelectField>
      </div>
    );
  }
}

export default Filter;
