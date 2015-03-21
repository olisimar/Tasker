
// http://expressjs.com/api.html

var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var Task = require('./schemas/models').Task;
var User = require('./schemas/models').User;
var Project = require('./schemas/models').Project;


app.get('/', function(req, res){
	res.json('Tasker api');
});

app.get('/tasks', function(req, res){
	Task.find(function(err, tasks){
  		if (err){
  			console.log(err);
  			res.json(err);
  		}
  		res.json(tasks);
  	});
});

app.post('/tasks', function(req, res){
	console.log(req);
	console.log(req.body);
	var task = new Task(req.body);
  	task.save(function(err, savedTask){
  		if (err){
  			console.log(err);
  			res.json(err);
  		}
  		res.json(savedTask);	
  	});
});



app.get('/users', function(req, res){
	User.find(function(err, users){
		if (err){
  			console.log(err);
  			res.json(err);
  		}
		res.json(users);
	});
});

app.post('/users', function(req, res){
	var user = new User(req.body);
  	user.save(function(err, savedUser){
  		if (err){
  			console.log(err);
  			res.json(err);
  		}
  		res.json(savedUser);
  	});
});



app.get('/projects', function(req, res){
	Project.find(function(err, projects){
		if (err){
  			console.log(err);
  			res.json(err);
  		}
		res.json(projects);
	});
});

app.post('/projects', function(req, res){

});

app.listen(3000);
console.log('server started');