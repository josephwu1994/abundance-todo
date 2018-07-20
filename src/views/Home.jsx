import React, { Component } from "react";
import Input from "./Input.jsx";
import Todos from "./Todos.jsx";
import CSS from "./views.css";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="mainContainer">
        <Input />
        <Todos />
      </div>
    );
  }
}

export default Home;
