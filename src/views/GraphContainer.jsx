import React, { Component } from 'react';
import { PacmanLoader } from 'react-spinners';

import Graph from './Graph.jsx';

class GraphContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.interval = setInterval( () => {
      fetch('/getAll')
        .then(res => res.json())
        .then(todos => this.setState({ todos, loading: false }));
    }, 1000)
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  render() {
    if (this.state.loading) {
      return (
        <div className='todosContainer'>
          <div className='loading'>
            <PacmanLoader color='#4e54c8' />
          </div>
          <div className='load'>Loading ... </div>
        </div>
      );
    } else {
      return (
        <div className='graphContainer'>
          <Graph todos={this.state.todos}/>
        </div>
      )
    }
  }
}
export default GraphContainer;
