/* Bonfire: Pairwise

Given an array arr, find element pairs whose sum equal the second argument arg and return the sum of their indices.

If multiple pairs are possible that have the same numeric elements but different indices, return the smallest sum of indices. 
Once an element has been used, it cannot be reused to pair with another.

Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

Here are some helpful links:
Array.prototype.reduce()

pdey@ncsu.edu
http://www.freecodecamp.com/piyalidey
*/


function pairwise(arr, arg) {
 // Set sum of indices to zero
 var sum = 0;
 // make a local copy of the arguments object so we don't modify it directly
 var pairArr = arr.slice();
 // looping from first element
 for(i = 0; i < pairArr.length; i++) {
   //Looping from second element by setting first element  constant
   for(j = i + 1; j < pairArr.length; j++) {
     // Check whether the sum is equal to arg
     if(pairArr[i] + pairArr[j] == arg) {
       //Add the indices
       sum += i + j;
       //Set the indices to NaN so that they can't be used in next iteration
       pairArr[i] = pairArr[j] = NaN;
     }
   }
 }
 return sum;
}

// test here
pairwise([1,4,2,3,0,5], 7);