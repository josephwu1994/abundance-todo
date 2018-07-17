import React, { Component } from 'react';

class Attributes extends Component {
  render() {
    return (
      <div id='attr' className="container-fluid">
				<div className="title"><span>Title</span></div>
				<button type='button' id='priority' className='btn btn-outline-primary'>Priority</button>
				<button type='button' id='status' className='btn btn-outline-primary'>Status</button>
				<button type='button' id='duedate' className='btn btn-outline-primary'>Due Date</button>
      </div>
    );
  }
}

export default Attributes;