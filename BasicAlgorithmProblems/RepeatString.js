/* Bonfire: Repeat a string repeat a string 

Repeat a given string (first argument) num times (second argument). 
Return an empty string if num is not a positive number.

Remember to use Read-Search-Ask if you get stuck. Write your own code.

Here are some helpful links:

Global String Object

code by Piyali Dey
pdey@ncsu.edu
 */

// Using recursion
function repeatStringNumTimes(str, num) {
    if(num < 0)
        return "";
    if(num === 1)
        return str;
    else
        return str + repeatStringNumTimes(str, num - 1);
}


