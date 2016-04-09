var readline = require('readline');
var reader = readline.createInterface({
  input  : process.stdin,
  output : process.stdout
});

function HanoiGame () {
  this.stacks = [[3, 2, 1], [], []];
}

HanoiGame.prototype = {
  // run : function () {
  //
  // },

  promptMove : function () {
    var self = this;
    console.log(this.stacks);
    var q1 = "Which stack would you like to move from?\n";
    var q2 = "Which stack would you like to move to?\n";
    var startTowerIdx;
    var endTowerIdx;

    reader.question(q1, function(answer1) {
      startTowerIdx = parseInt(answer1);
      console.log(startTowerIdx);

      reader.question(q2, function(answer2) {
        endTowerIdx = parseInt(answer2);
        console.log(endTowerIdx);
        if(self.isValidMove(startTowerIdx, endTowerIdx)){
          self.move(startTowerIdx, endTowerIdx);
        } else {
          console.log("That's not a valid move!");
        }
      });
    });
  },

  isValidMove : function(startTowerIdx, endTowerIdx){
    var startOffGrid = (startTowerIdx >= this.stacks.length ||
      startTowerIdx < 0);
    var endOffGrid = (endTowerIdx >= this.stacks.length ||
      endTowerIdx < 0);

    if (startOffGrid || endOffGrid) {
      return false;
    }

    var moveVars = this.calcMoveVars(startTowerIdx, endTowerIdx);

    if (moveVars.startDisk === undefined) {
      return false;
    } else if (moveVars.startDisk < moveVars.endDisk ||
        moveVars.endDisk === undefined) {
      return true;
    } else {
      return false;
    }
  },

  calcMoveVars : function(startTowerIdx, endTowerIdx){
    var moveVars = {
      startTower : this.stacks[startTowerIdx],
      endTower   : this.stacks[endTowerIdx]
    };
    moveVars.startDisk = moveVars.startTower[moveVars.startTower.length - 1];
    moveVars.endDisk = moveVars.endTower[moveVars.endTower.length - 1];

    return moveVars;
  },

  move : function(startTowerIdx, endTowerIdx){
    var moveVars = this.calcMoveVars(startTowerIdx, endTowerIdx);
    moveVars.endTower.push(moveVars.startTower.pop());
  },

  print : function() {
    console.log(this.stacks);
  },

  isWon : function() {
    return (this.stacks[1].length === 3 || this.stacks[2].length === 3);
  },

  run : function(completionCallback) {
    this.promptMove();

    if (this.isWon()) {
      completionCallback();
    } else {
      this.run(completionCallback);
    }
  }
};

var game = new HanoiGame();

game.run(function() {
  reader.close();
  console.log("winner!");
});
