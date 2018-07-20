import React, { Component } from "react";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import DatePicker from "material-ui/DatePicker";
import MenuItem from "material-ui/MenuItem";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import { connect } from 'react-redux';
import { addTodo } from '../store/actions/index';

const mapDispatchToProps = dispatch => ({
  addTodo: (todo) => dispatch(addTodo(todo)),
})

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      priority: null,
      date: null,
      open: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleChange(e, value) {
    if (typeof value === "number") this.setState({ priority: value });
    else if (typeof value === "object") this.setState({ date: value });
    else this.setState({ title: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.title || !this.state.date || !(this.state.priority + 1))
      this.setState({ open: true });
    else {
      fetch("/addTodo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...this.state, status: "In Progress" })
      })
        .then(res => res.json())
        .then(json => {
          
          this.props.addTodo(json);
        })
        .catch(err => console.log("Failed to post todo " + err));
      this.setState({
        date: null,
        title: "",
        priority: null
      });
    }
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div className="input">
        <span className="inputTitle"> ADD TODO </span>
        <div className="inputFieldTop">
          <SelectField
            style={{ width: "50%" }}
            floatingLabelText="Priority"
            value={this.state.priority}
            onChange={this.handleChange}
          >
            <MenuItem value={0} primaryText="High" />
            <MenuItem value={1} primaryText="Medium" />
            <MenuItem value={2} primaryText="Low" />
          </SelectField>
          <DatePicker
            className="datePicker"
            hintText="Due Date"
            value={this.state.date}
            onChange={this.handleChange}
            textFieldStyle={{ width: "100%" }}
          />
        </div>
        <div className="inputFieldBot">
          <TextField
            value={this.state.title}
            hintText="I need to..."
            floatingLabelText="What to do?"
            onChange={this.handleChange}
            style={{ width: "89%" }}
          />
          <FloatingActionButton onClick={this.handleSubmit}>
            <ContentAdd />
          </FloatingActionButton>
          <Dialog
            title="One or Many Fields are Missing"
            actions={
              <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
              />
            }
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            Please fill in all the fields in order to add todo.
          </Dialog>
        </div>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Input);
