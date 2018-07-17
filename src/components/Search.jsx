import React, { Component } from 'react';

class Search extends Component {
  render() {
    return (
      <div id='search' className="input-group mb-3">
				<input type="text" className="form-control" placeholder="Title..." aria-label="Title" aria-describedby="button-addon2" />
				<div className="input-group-append">
					<button className="btn btn-outline-info btn-lg" type="button" id="search">Search</button>
				</div>
			</div>
    );
  }
}

export default Search;
