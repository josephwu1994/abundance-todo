import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PacmanLoader } from 'react-spinners';

import Graph from './Graph.jsx';

const mapStateToProps = (store) => {
  return {todos: store.todos}
}

class GraphContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: this.props.todos,
      loading: true,
    };
  }

  componentDidMount() {
    this.setState({loading: false});
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
export default connect(mapStateToProps, null)(GraphContainer);
