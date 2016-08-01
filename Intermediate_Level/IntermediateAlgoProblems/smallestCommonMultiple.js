/*Bonfire: Smallest Common Multiple

Find the smallest number that is evenly divisible by all numbers in the provided range.

The range will be an array of two numbers that will not necessarily be in numerical order.

Remember to use RSAP if you get stuck. Try to pair program. Write your own code.

Description:
The smallest common multiple between two numbers is the smallest number 
that both numbers can divide into. This concept can be extended to more 
than two numbers as well. We can first start with just finding the smallest 
common multiple between two numbers. Naively, you can start writing out 
multiple of each number until you write a multiple that exists from both numbers.

An example would be the numbers 3 and 4. The multiples of 3 are 3, 6, 9, 12, 
15, 18, ... and the multiples of 4 are 4, 8, 12, 16, 20, .... The first smallest number
we run into in both lists is 12 so this is the smallest common multiple between 3 and 4.

This problem can be confusing because most people look for the smallest common multiple of just the two numbers but forget the keyword range. However, this means that if you are given [1,5], then you have to check for the smallest common multiple for all the numbers [1,2,3,4,5] that is evenly divisible by all of them.


Code by Piyali Dey
pdey@ncsu.edu
http://www.freecodecamp.com/piyalidey
*/

function smallestCommons(arr) {
  // Sort array from greater to lowest
  // This line of code was from Adam Doyle (http://github.com/Adoyle2014)
  arr.sort(function(a, b) {
    return b - a;
  });

  // Create new array and add all values from greater to smaller from the original array.
  var newArr = [];
  for (var i = arr[0]; i >= arr[1]; i--) {
    newArr.push(i);
  }

  // Variables needed declared outside the loops.
  var quot = 0;
  var loop = 1;
  var n;

  // run code while n is not the same as the array length.
  do {
    quot = newArr[0] * loop * newArr[1];
    for (n = 2; n < newArr.length; n++) {
      if (quot % newArr[n] !== 0) {
        break;
      }
    }

    loop++;
  } while (n !== newArr.length);

  return quot;
}

smallestCommons([1, 13]);

/* If the array only has two elements then the for loop never gets used and the return value is the product of said numbers. Otherwise, from the third element and until n is the same and the array length check if the reminder of the quotient and the third value of the array is not 0, if it is not 0 then stop loop increases and then we start over. If the reminded was 0 then keep checking until the end of the array. */

