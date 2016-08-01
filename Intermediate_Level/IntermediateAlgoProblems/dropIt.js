/* /* Bonfire: Drop it

Drop the elements of an array (first argument), starting from the front, until the predicate (second
argument) returns true.

Remember to use RSAP if you get stuck. Try to pair program. Write your own code.

Here are some helpful links:
Arguments object
Array.shift()

Code by Piyali Dey
pdey@ncsu.edu
http://www.freecodecamp.com/piyalidey
*/



function dropElements(arr, func) {
  // drop them elements.
  var times = arr.length;
  for (var i = 0; i < times; i++) {
    if (func(arr[0])) {
      break;
    } else {
      arr.shift();
    }
  }
  return arr;
}


dropElements([1, 2, 3], function(n) {return n < 3; });