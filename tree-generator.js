function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
/**
 * Create a random  tree with a max depth of 4.
 */
function createRandomTree(aLevel, parentId) {
  if (aLevel < 4) {
    var thisNode = {
      title: "Node level " + aLevel,
      id: getRandomInt(10, 1000),
      parentId: parentId,
      children: []
    };
    var numChildren = getRandomInt(0, 5);
    for (var i = 0; i < numChildren; i++) {
      var child = createRandomTree(aLevel + 1, thisNode.id);
      if (child) {
        thisNode.children.push(child);
      }
    }
    return thisNode;
  } else {
    return null;
  }
}

exports.createRandomTree = createRandomTree;