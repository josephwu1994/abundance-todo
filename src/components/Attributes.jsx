import React, { Component } from 'react';

class Attributes extends Component {
  render() {
    return (
      <div id='attr' className="container-fluid">
				<div className="titleAttr">Title</div>
				<button type='button' id='priorityAttr' className='btn btn-outline-primary'>Priority</button>
				<button type='button' id='statusAttr' className='btn btn-outline-primary'>Status</button>
				<button type='button' id='duedateAttr' className='btn btn-outline-primary'>Due Date</button>
      </div>
    );
  }
}

export default Attributes;