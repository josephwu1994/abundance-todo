import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Tabs, Tab } from "material-ui/Tabs";
import SwipeableViews from "react-swipeable-views";
import AppBar from "material-ui/AppBar";

import Home from "../views/Home.jsx";
import Graph from "../views/Graph.jsx";

class Layout extends Component {
  constructor() {
    super();
    this.state = {
      slideIndex: 0
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({
      slideIndex: value
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title={`Todo by Joseph`}
            style={{ textAlign: "center", backgroundColor: "#2196F3" }}
            showMenuIconButton={false}
          />
          <Tabs onChange={this.handleChange} value={this.state.slideIndex}>
            <Tab
              buttonStyle={{ height: "75px", backgroundColor: "#1E88E5" }}
              label="Home"
              value={0}
            />
            <Tab
              buttonStyle={{ height: "75px", backgroundColor: "#1E88E5" }}
              label="Graph"
              value={1}
            />
          </Tabs>
          <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleChange}
          >
            <Home />
            <Graph />
          </SwipeableViews>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Layout;
