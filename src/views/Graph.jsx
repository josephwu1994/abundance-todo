import React, { Component } from "react";
import Paper from "material-ui/Paper";

import GraphTodos from '../components/GraphTodos.jsx';

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: {}
    };
  }

  componentWillReceiveProps(prop) {
    if (prop.todos.length !== this.state.todos.length) {
      const x = "Due Date";
      prop.todos.sort((a, b) => {
        if (parseInt(a[x].slice(0, 4)) === parseInt(b[x].slice(0, 4))) {
          if (parseInt(a[x].slice(5, 7)) === parseInt(b[x].slice(5, 7))) {
            if (parseInt(a[x].slice(-2)) === parseInt(b[x].slice(-2))) {
              return true;
            } else return parseInt(a[x].slice(-2)) - parseInt(b[x].slice(-2));
          } else return parseInt(a[x].slice(5, 7)) - parseInt(b[x].slice(5, 7));
        } else return parseInt(a[x].slice(0, 4)) - parseInt(b[x].slice(0, 4));
      });
      const orderedTodos = {};
      prop.todos.forEach(todo => {
        if(orderedTodos[todo['Due Date']]) orderedTodos[todo['Due Date']].push(todo);
        else orderedTodos[todo['Due Date']] = [todo];
      })
      this.setState({ todos: orderedTodos });
    }
  }

  render() {
    const displayArr = Object.keys(this.state.todos).map(date => {
      return (
        <div className="graphListItem" key={date} >
          <hr />
          <Paper 
            circle={true} 
            zDepth={2} 
            style={{ 
              textAlign: "center",
              margin: '20px', 
              width: '100px', 
              height: '100px',
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
              zIndex: 100,
            }}
            children={(
              <div className='graphDate'>{date}</div>
            )}
          />
          <GraphTodos todos={this.state.todos[date]} /> 
        </div>
      );
    });

    return (
      <div className="graphInnerContainer">
        {displayArr}
      </div>
    );
  }
}
export default Graph;
