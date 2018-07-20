import React, { Component } from 'react';
import { Card, CardTitle } from 'material-ui/Card';

class GraphTodoCard extends Component {
  render() {
    const titleColor = {
      'In Progress': 'rgba(0, 0, 0, 0.65)',
      'Complete' : 'rgba(0,0,0,0.2)',
    }
    const priorityColor = {
      High: '#4527A0',
      Medium: '#03A9F4',
      Low: '#9E9E9E'
    };
    const borderColor = {
      Complete: { backgroundColor:'rgba(0, 0, 0, 0.3)'},
      'In Progress': {}
    }
    const todo = this.props.todo;
    return (
      <Card
        style={{ ...borderColor[todo.Status], borderRadius: '15px' }}
        className='graphTodoCard'
        containerStyle={{
          padding: '0px',
          display: 'flex',
          alignItems: 'center',
          height: '40px',
        }}
      >
        <CardTitle
          style={{ display: 'flex', alignItems: 'center', flexGrow: '1' }}
          titleColor={titleColor[todo.Status]}
          title={`${todo.Assignment}`}
          titleStyle={{ marginRight: '30px', fontSize: '1em' }}
          children={
            <div
              className='graphCardPriority'
              style={{ 
                backgroundColor: priorityColor[todo.Priority],
              }}
            >
              {todo.Priority}
            </div>
          }
        />
      </Card>
    );
  }
}

export default GraphTodoCard;
