/* Bonfire: Symmetric Difference

Create a function that takes two or more arrays and returns an array of the symmetric difference of the provided arrays.
The mathematical term symmetric difference refers to the elements in two sets that are in either the first or second set, but not in both.

Remember to use RSAP if you get stuck. Try to pair program. Write your own code.

Explanation:
Symmetric Difference is the difference between two sets.

So in the Symmetric Difference Bonfire you would work through the arrays of numbers something like this -

sym(A, B, C) Translates to sym(sym(A,B),C)

First find the Symmetric Difference of Set A and Set B. Then find the Symmetric Difference of this new set and Set C.

sym([1, 2, 5], [2, 3, 5], [3, 4, 5])  would equal [1,4,5]

Something a bit strange about the definition of symmetric difference is that if one identical item occurs in three different sets, it is a member of the 
symmetric difference.

Here are some helpful links:
Array.reduce()

pdey@ncsu.edu
http://www.freecodecamp.com/piyalidey
*/

function sym() {

  /* The arguments object is not an Array. It is similar to an Array, but does not have any Array properties except length. For example, it does not 
        have the pop method. However it can be converted to a real Array. */
        var args = Array.prototype.slice.call(arguments);
    
    // Return the symmetric difference of 2 arrays
        var getDiff = function(arr1, arr2) {

    // Returns items in arr1 that don't exist in arr2
        function filterFunction(arr1, arr2) {
            return arr1.filter(function(item) {
            return arr2.indexOf(item) === -1;
            });
        }

    // Run filter function on each array against the other then get unique values
    return filterFunction(arr1, arr2)
      .concat(filterFunction(arr2, arr1))
      .filter(function(item, idx, arr) {
        // Keep any items that are unique - the index of the current item === index of the first occurrence in the array
        return arr.indexOf(item) === idx;
      });
  };

  // Reduce all arguments getting the difference of them
  return args.reduce(getDiff, []);
}
