import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class Create extends Component {
	constructor(props) {
		super(props)
		this.state = {
			startDate: moment(),
			title: '',
			priority: 'High',
		}
		this.handleChangeDate = this.handleChangeDate.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	handleChangeDate(date) {
		console.log(date);
		this.setState({startDate: date});
	}

	handleChange(e) {
		if(e.target.value === 'High' || e.target.value === 'Medium' || e.target.value === 'Low') {
			this.setState({priority: e.target.value});
		} else {
			this.setState({title: e.target.value});
		}
	}
	onSubmit(e) {
		e.preventDefault();
		this.props.addTodo({...this.state, status : 'In Progress'});
		this.setState({
			startDate: moment(),
			title: '',
			priority: 'High',
		})
	}

  render() {
    return (
      <div id='create' className='card text-white bg-dark'>
				<form onSubmit={this.onSubmit}>
					<div className='form-group row'>
						<label className='col-sm-1 col-form-label'>Title</label>
						<div className='col-sm-11'>
							<input type='text' value={this.state.title} className='form-control' placeholder='Assignment Title...' onChange={this.handleChange} />
						</div>
					</div>
					<fieldset className='form-group'>
						<div className='row'>
							<label className='col-form-label col-sm-1'>Priority</label>
							<div className='col-sm-11'>
								<div style={{margin: 0}} className='form-group'>
									<select onChange={this.handleChange} value={this.state.priority} id='priorityDD' className='form-control' >
										<option value='High' >High</option>
										<option value='Medium' >Medium</option>
										<option value='Low' >Low</option>
									</select>
								</div>
							</div>
						</div>
					</fieldset>
					<div className='form-group row'>
						<div className='col-sm-1'>Due Date</div>
						<div className='col-sm-11'>
							<DatePicker inline dateFormat="YYYY/MM/DD" selected={this.state.startDate} onChange={this.handleChangeDate}/>
						</div>
					</div>
					<div className='form-group row'>
					<div className='col-sm-1'></div>
						<div className='col-sm-3'>
							<button type='submit' id='submit' className='btn btn-primary'>Submit</button>
						</div>
					</div>
				</form>
			</div>
    );
  }
}

export default Create;
