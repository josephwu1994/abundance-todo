const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const TodoController = require('./Controller/todoController')

const app = express();

app.use(express.static('build'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'));
})
app.get('/getAll', TodoController.getAll);
app.post('/addTodo', TodoController.addTodo);

app.listen(3000, () => { console.log('listening at port 3000') });