
// http://expressjs.com/api.html

var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var path       = require('path');
var controller = require('./server-controller');
var port       = process.env.PORT || 8080;

// connect to database

mongoose.connect('mongodb://localhost:27017/Tasker');

// Pre-load the database with some cool stuff!
require('./populate-database');

// middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// serve static web content from the /www folder

app.use(express.static(path.join(__dirname, '/www')));

// set up routes

app.get('/tree', controller.binarytree);

app.get('/tasks', controller.tasks);
app.get('/tasksPopulate', controller.tasksPopulate);
app.post('/tasks', controller.createTask);

app.get('/users', controller.users);
app.post('/users', controller.createUser);

app.get('/projects', controller.projects);
app.post('/projects', controller.createProject);


// listen for connections

app.listen(port);

console.log('server started on port %d', port);