/**
 * ************************************
 *
 * @module  Ｓearch
 * @author  josephwu1994
 * @date    6/17/2018
 * @description search bar to filter todos
 *
 * ************************************
 */
import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleClick() {
    const match = `(${this.state.value})`;
    const reg = new RegExp(match, "g");
    const result = this.props.todos.filter(todo => {
      return todo.Assignment.toLowerCase().match(reg) !== null;
    });
    if (result.length === 0) alert("No matching todo");
    if (this.state.value === "") this.props.filter("");
    this.props.filter(result);
    this.setState({ value: "" });
  }

  render() {
    return (
      <div id="search" className="input-group mb-3">
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          className="form-control"
          placeholder="Title..."
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-info btn-lg"
            type="button"
            onClick={this.handleClick}
            id="searchBtn"
          >
            Search
          </button>
        </div>
      </div>
    );
  }
}

export default Search;
