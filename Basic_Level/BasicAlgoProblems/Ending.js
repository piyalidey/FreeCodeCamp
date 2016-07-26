/*  Bonfire: Confirm the Ending

Check if a string (first argument, str) ends with the given target string 
(second argument, target).

This challenge can be solved with the .endsWith() method, which was i
ntroduced in ES2015. But for the purpose of this challenge, we would like you t
o use one of the JavaScript substring methods instead.

Remember to use Read-Search-Ask if you get stuck. Write your own code.

Here are some helpful links:

String.prototype.substr()
String.prototype.substring()   

code by Piyali Dey
pdey@ncsu.edu
*/

/* substr() calculates the index of first matching character from the string's end if the specified location is negative.
Hence we use the method substr() with the negative value of target's length to extract the ending  segment of str 
of the same size as target, compare it to target, and then return the value of this boolean expression. */

function confirmEnding(str, target) {
  return str.substr(-target.length) === target;
}