/*  Bonfire: Return Largest Numbers in Array

Return an array consisting of the largest number from each provided  sub-array. For simplicity, the provided array will contain exactly 4 sub-arrays.

Remember, you can iterate through an array with a simple for loop, and access 
each member with array syntax arr[i].

Remember to use Read-Search-Ask if you get stuck. Write your own code.

Here are some helpful links:

Comparison Operators 

code by Piyali Dey
pdey@ncsu.edu
*/

function largestOfArray(arr) {
    var results =[ ] ;
    for (var n=0; n<arr.length; n++) {
        var largestNumber = 0;
        for ( var sub = 0; sub < arr[n].length; sub++) {
            if (arr[n][sub] > largestNumber) {
                largestNumber = arr [n] [sub] ;
            }
        }

        results[n] = largestNumber;
    }
    return results; 
}