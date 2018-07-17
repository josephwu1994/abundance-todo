import React, { Component } from 'react';
import Attributes from './Attributes.jsx';
import Search from './Search.jsx';
import Create from './Create.jsx';
import Table from './Table.jsx';

class App extends Component {
	constructor(){
		super()
		this.state = {
			todo: []
		}
		this.addTodo = this.addTodo.bind(this);
	}

	addTodo(task) {
		console.log('i got here');
		fetch('/addTodo', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(task)
		}).then(res => res.json())
		.then(json => {
			const arr = this.state.todo;
			arr.push(json);
			this.setState({todo: arr});
		})
		.catch(err => console.log('Failed to post todo '+ todo))
	}

  render() {
    return (
      <div className="App">
				<Create addTodo={this.addTodo}/>
				<Search />
				<Attributes />
				<Table todo={this.state.todo}/>
      </div>
    );
  }
}

export default App;
