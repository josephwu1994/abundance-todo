require('dotenv').load();

const Airtable = require('airtable');

const base = new Airtable({
  apiKey: process.env.AIRTABLE_KEY
}).base('appI7fYp5eZMDXFCz');

module.exports = {
  // retrieves all todos from Airtable
  getAll: (req, res) => {
    base('Assignment')
      .select({
        view: 'All Content by Section',
      })
      .firstPage((err, todo) => {
        const todos = [];
        todo.forEach((data) => {
          todos.push({
            ...data.fields,
            id: data.id,
          });
        });
        res.json(todos);
      });
  },
  // create new todo in Airtable
  addTodo: (req, res) => {
    const priority = ['High', 'Medium', 'Low'];
    const data = {
      Status: req.body.status,
      Priority: priority[req.body.priority],
      Assignment: req.body.title,
      'Due Date': req.body.date.slice(0, 10),
    };
    base('Assignment').create(data, (err, todo) => {
      if (err) console.log(err);
      res.json({
        ...data,
        id: todo.getId(),
      });
    });
  },
  // update todo status
  updateTodo: (req, res) => {
    base('Assignment').update(
      req.body.id, {
        Status: req.body.Status,
      },
      (err, record) => {
        if (err) console.log(`failed to update airtable ${err}`);
        res.send(record);
      }
    );
  }
};