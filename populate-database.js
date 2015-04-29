var Task = require('./schemas/models').Task;
var User = require('./schemas/models').User;
var Project = require('./schemas/models').Project;

// Drop the collections before inserting new data
Task.remove({}, function (err) {
  console.log('collection tasks removed')
});

function createTask(title) {
  var task = new Task({
    title: title
  });
  task.save();
  return task;
}

function createProject(title) {
  var project = new Project({
    title: title
  });
  project.save();
  return project;
}


function showProjects() {

  Task
    .find({})
    .populate('parent')
    .exec(function (err, task) {
      if (err) {
        console.log('err');
        console.log(err);
      }
      console.log('success');
    });
}


Task.find(function (err, all_tasks) {

  /*if (all_tasks.length) {
   console.log('we already have data');
   return;
   }*/

  var taskParent = new Task({
    done: false,
    title: 'this is the title!',
    estimate: 3,
    actual: 2
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
    todos: ['nodejs', 'javascript'],
    parent: taskParent._id // <<-------- !!!!!
  });

  child.save();


});

