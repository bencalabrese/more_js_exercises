var readline = require('readline');
var reader = readline.createInterface({
  input  : process.stdin,
  output : process.stdout
});

function askIfGreaterThan(el1, el2, callback){
  var questionString = "Is "+ el1 + " greater than " + el2 + "?\n";

  reader.question(questionString, function(answer){
    var shouldSwap = (answer === "yes" ? true : false);
    callback(shouldSwap);
  });
}

function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop){
  if(i === (arr.length - 1)){
    outerBubbleSortLoop(madeAnySwaps);
  } else {
    askIfGreaterThan(arr[i], arr[i+1], function(isGreaterThan){
      if(isGreaterThan){
        var temp = arr[i];
        arr[i] = arr[i+1];
        arr[i+1] = temp;
        madeAnySwaps = true;
      }
      innerBubbleSortLoop(arr, i+1, madeAnySwaps, outerBubbleSortLoop);
    });
  }
}

function absurdBubbleSort (array, sortCompletionCallback) {
  var outerBubbleSortLoop = function (madeAnySwaps) {
    if (madeAnySwaps) {
      innerBubbleSortLoop(array, 0, false, outerBubbleSortLoop);
    } else {
      sortCompletionCallback(array);
    }
  };

  outerBubbleSortLoop(true);
}

absurdBubbleSort(["", "a", NaN, "Prince", "Queen"], function(array) {
  reader.close();
  console.log(array);
});
