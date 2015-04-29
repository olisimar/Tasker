var Task = require('./schemas/models').Task;
var User = require('./schemas/models').User;
var Project = require('./schemas/models').Project;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
/**
 * Create a random  tree with a max depth of 4.
 */
function createRandomTree(aLevel, parentId) {
  if (aLevel < 4) {
    var thisTask = new Task({
      title: 'I am a task',
      parent: parentId,
      children: []
    });
    thisTask.save(); // Creates an _id for us
    console.log('saved task ' + thisTask._id);

    var numChildren = getRandomInt(0, 5);
    for (var i = 0; i < numChildren; i++) {
      var child = createRandomTree(aLevel + 1, thisTask._id);
      if (child) {
        thisTask.children.push(child._id);
      }
    }
    thisTask.save(); // Store child ids
    console.log('added children to task ' + thisTask._id);

    return thisTask;

  } else {
    return null;
  }
}

// Drop the collections before inserting new data
Task.remove({}, function (err) {
  console.log('collection tasks removed')
});

createRandomTree(0, null);