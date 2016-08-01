/* Bonfire: Diff Two Arrays

Compare two arrays and return a new array with any items not found in both of the original arrays.

Remember to use RSAP if you get stuck. Try to pair program. Write your own code.

Here are some helpful links:
Comparison Operators
String.slice()
Array.filter()
Array.indexOf()
String.concat()

Code by Piyali Dey
pdey@ncsu.edu
http://www.freecodecamp.com/piyalidey
*/


function diffArray(arr1, arr2) {
  var newArr = arr1.concat(arr2);
  // Same, same; but different.
  function check(item) {
    if (arr1.indexOf(item) === -1 || arr2.indexOf(item) === -1) {
      return item;
    }
  }
  
  return newArr.filter(check);
}

diffArray([1, 2, 3, 5], [1, 2, 3, 4, 5]);
