var Task = require('./schemas/models').Task;
var User = require('./schemas/models').User;
var Project = require('./schemas/models').Project;

var treeGenerator = require('./tree-generator');

//
exports.randomTree = function (req, res) {
  res.json(treeGenerator.createRandomTree(0, null));
};


/**
 * Show all the tasks!
 */
exports.tasks = function (req, res) {
  Task
    .find()
    .exec()
    .then(function (err, tasks) {
      if (err) {
        console.log(err);
        res.json(err);
      }
      res.json(tasks);
    });
};

/**
 * Show all the tasks, put populate references..  (experimental)
 */
exports.tasksPopulate = function (req, res) {
  Task
    .find({})
    .populate('parent')
    .exec(function (err, tasks) {
      if (err) {
        res.json(err);
        console.log(err);
      }
      res.json(tasks);
    });
};

/**
 * Create a new task!
 */
exports.createTask = function (req, res) {
  // incomming json data from gui is stored in req.body via body-parser
  var json = req.body;

  // create a task by passing in the data to the constructor.
  // note that we do not have an _id yet.
  var task = new Task(req.body);

  // call the save method. when task is saved, the callback will run
  // sending the saved task back (including _id) as json as response.
  task.save(function (err, savedTask) {
    if (err) {
      console.log(err);
      res.json(err);
    }
    res.json(savedTask);
  });
};


exports.users = function (req, res) {
  User
    .find()
    .exec()
    .then(function (err, users) {
      if (err) {
        console.log(err);
        res.json(err);
      }
      res.json(users);
    });
};

exports.createUser = function (req, res) {
  var user = new User(req.body);
  user.save(function (err, savedUser) {
    if (err) {
      console.log(err);
      res.json(err);
    }
    res.json(savedUser);
  });
};


exports.projects = function (req, res) {
  res.json('todo');
};

exports.createProject = function (req, res) {
  res.json('todo');
};