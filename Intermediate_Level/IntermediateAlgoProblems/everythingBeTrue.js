
/* Bonfire: Everything Be True

Check if the predicate (second argument) returns truthy (defined) for all elements of a collection
(first argument).

For this, check to see if the property defined in the second argument is present on every element of
the collection.

Remember, you can access object properties through either dot notation or [] notation.

Remember to use RSAP if you get stuck. Try to pair program. Write your own code.

Here are some helpful links:
Object.hasOwnProperty()
Object.getOwnPropertyNames()

Code by Piyali Dey
pdey@ncsu.edu
http://www.freecodecamp.com/piyalidey
*/

function truthCheck(collection, pre) {
  // Create a counter to check how many are true.
  var counter = 0;
  // Check for each object
  for (var c in collection) {
    // If it is has property and value is truthy
    if (collection[c].hasOwnProperty(pre) && Boolean(collection[c][pre])) {
      counter++;
    }
  }
  // Outside the loop, check to see if we got true for all of them and return true or false
  return counter == collection.length;
}