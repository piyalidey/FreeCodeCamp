/* Bonfire:  Reverse the provided string.

You may need to turn the string into an array before you can reverse it.

Your result must be a string.

Remember to use Read-Search-Ask if you get stuck. Write your own code.

Here are some helpful links:

Global String Object
String.prototype.split()
Array.prototype.reverse()
Array.prototype.join() 

Code by Piyali Dey
pdey@ncsu.edu

*/

function reverseString(str) {
    return str.split('').reverse().join('');
}

reverseString ('hello');