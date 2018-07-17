require('dotenv').load();
const key = process.env.AIRTABLE_KEY;
const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.AIRTABLE_KEY}).base('appI7fYp5eZMDXFCz');

module.exports = {
	getAll :  (req, res) => {
		base('Assignment').select({view: "All Content by Section"}).firstPage((err, todo) => {
			todo.forEach((data) => {
				console.log(data.fields);
			})
		})
	},
	addTodo: (req, res) => {
		const data = {
			Status: req.body.status,
			Priority: req.body.priority,
			Assignment: req.body.title,
			'Due Date': req.body.startDate.slice(0,10),
		}
		base('Assignment').create(data, (err, todo) => {
			if(err) console.log(err);
			res.json({...data, id: todo.getId()});
		})
	}
}