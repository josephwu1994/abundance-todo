import React, { Component } from 'react';

import GraphTodoCard from '../components/GraphTodoCard.jsx';

class GraphTodos extends Component{
  constructor(props){
    super(props)
  }

  render(){
    const high = [];
    const medium = [];
    const low = [];
    this.props.todos.forEach( todo => {
      if(todo.Priority === 'High') high.push(<GraphTodoCard key={todo.id} todo={todo}/>);
      else if (todo.Priority === 'Medium') medium.push(<GraphTodoCard key={todo.id} todo={todo}/>);
      else low.push(<GraphTodoCard key={todo.id} todo={todo}/>);
    })

    return(
      <div className='graphTodoContainer'>
        <div className='graphTodo'>
          {high}
        </div>
        <div className='graphTodo'> 
          {medium}
        </div>
        <div className='graphTodo'>     
          {low}
        </div>
      </div>
    )
  }
}

export default GraphTodos;