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
import TextField from "material-ui/TextField";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      focus: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleEnter(e) {
    if (this.state.value === "") this.props.filter("");
    else if (e.which === 13 && this.state.focus) {
      const match = `(${this.state.value})`;
      const reg = new RegExp(match, "g");
      const result = this.props.todos.filter(todo => {
        return todo.Assignment.toLowerCase().match(reg) !== null;
      });
      this.props.filter(result);
      this.setState({ value: "" });
    }
  }
  handleFocus() {
    this.setState({ focus: true });
  }
  handleBlur() {
    this.setState({ focus: false });
  }

  render() {
    return (
      <div id="search">
        <TextField
          style={{
            width: "100%",
            boxShadow: '0 0 5px 1px rgba(0,0,0,0.2)',
            borderRadius: '25px',
            padding: '20px',
            backgroundColor: 'white',
            bottom: '3px'
          }}
          hintText="Title"
          floatingLabelText="Search for Keyword..."
          floatingLabelStyle={{fontSize: '1.5em'}}
          underlineShow={false}
          onChange={this.handleChange}
          onKeyDown={this.handleEnter}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      </div>
    );
  }
}

export default Search;
