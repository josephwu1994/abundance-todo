import React, { Component } from 'react';

class Table extends Component {
  render() {
    return (
      <div id='table' className='container-fluid'>
				<div id='title'>{}</div>
				<div id='priority'>{}</div>
				<div id='status'>{}</div>
				<div id='dueDate'>{}</div>
			</div>
    );
  }
}

export default Table;
