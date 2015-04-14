var Task       = require('./schemas/models').Task;
var User       = require('./schemas/models').User;
var Project    = require('./schemas/models').Project;



Task.find(function(err, all_tasks){

	/*if (all_tasks.length) {
		console.log('we already have data');
		return;
	}*/

	var taskParent = new Task({
		done: false,
  	title: 'this is the title!',
  	description: 'this is the description',
  	createdDate: new Date(),
  	startDate: new Date(),
  	endDate: new Date(),
  	estimate: 3,
  	actual: 2,
  	todos: ['this', 'that']
	});
 
	taskParent.save();



	var child = new Task({
		done: false,
  	title: 'i am a child',
  	description: 'i have a parent',
  	createdDate: new Date(),
  	startDate: new Date(),
  	estimate: 3,
  	actual: 2,
  	todos: ['nodejs','javascript'],
  	parent: taskParent._id // <<-------- !!!!!
	});
 
	child.save();



	Task
	.findOne({title: 'i am a child'})
	.populate('parent')
	.exec(function(err, task) {
		if (err) {
			console.log('err');
			console.log(err);
		}
		console.log('success');
		console.log(task.title);
		console.log(task.parent.title);
	});


});

