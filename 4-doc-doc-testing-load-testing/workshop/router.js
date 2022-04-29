const express = require('express');
const bodyParser = require('body-parser');
const { getTodo, postTodo, patchTodo } = require('./toDoController');
const app = express();

const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));

app.use(
    '/api-docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
);

app.get('/todo', getTodo);
app.post('/todo', postTodo);
app.patch('/todo/:id', patchTodo);

module.exports = app;