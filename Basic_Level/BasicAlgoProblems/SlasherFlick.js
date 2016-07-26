/* Bonfire: Slasher Flick

Return the remaining elements of an array after chopping off n elements from the head.

Remember to use RSAP if you get stuck. Try to pair program. 
Write your own code.

Here are some helpful links:

Array.slice() 
Array.splice()

Code by Piyali Dey
pdey@ncsu.edu
*/

/* For Modifying the original array use splice, 
slice if you don't want to modify the original array. */

function slasher(arr, howMany) {
  return arr.slice(howMany);
}

slasher([1, 2, 3], 2);