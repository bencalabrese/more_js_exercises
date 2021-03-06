var readline = require('readline');
var reader = readline.createInterface({
  input  : process.stdin,
  output : process.stdout
});

function addNumbers (sum, numsLeft, completionCallback) {
  if (numsLeft < 1) {
    completionCallback(sum);
    reader.close();
  } else {
    reader.question("Num?\n", function (answer) {
      sum += parseInt(answer);

      console.log("Interim sum: " + sum);

      addNumbers(sum, numsLeft - 1, completionCallback);
    });
  }
}

addNumbers(0, 3, function (sum) {
  console.log("Total Sum: " + sum);
});
