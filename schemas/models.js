var mongoose = require('mongoose');
var Schema = mongoose.Schema

var projectSchema = Schema({
  name          : String,
  description   : String,
  users         : [{ type: Schema.Types.ObjectId, ref: 'User' }],
  creator       :  { type: Schema.Types.ObjectId, ref: 'User' },
  initialTask   :  { type: Schema.Types.ObjectId, ref: 'Task' },
  createdDate   : Date,
  finishedDate  : Date,
  totalEstimate : Number,
  totalActual   : Number,
});

var userSchema = Schema({
  alias         : String,
  email         : String,
  password      : String,
  description   : String,
  projects      : [{ type: Schema.Types.ObjectId, ref: 'Project' }]
});

var taskSchema = Schema({
  done          : Boolean,
  title         : {type: String, required: true},
  description   : String,
  workers       : [{ type: Schema.Types.ObjectId, ref: 'User' }],
  creator       :  { type: Schema.Types.ObjectId, ref: 'User' },
  createdDate   : Date,
  startDate     : Date,
  endDate       : Date,
  estimate      : Number,
  actual        : Number,
  parent        :  { type: Schema.Types.ObjectId, ref: 'Task' },
  children      : [Task],
  todos         : [String]
});

var Project = mongoose.model('Project', projectSchema);
var User    = mongoose.model('User',    userSchema);
var Task    = mongoose.model('Task',    taskSchema);


// Export
exports.Project = Project;
exports.User = User;
exports.Task = Task;