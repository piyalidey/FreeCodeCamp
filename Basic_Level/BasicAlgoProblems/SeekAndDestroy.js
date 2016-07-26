/* Bonfire: Seek and Destroy

You will be provided with an initial array (the first argument in the destroyer function), followed by one 
or more arguments. Remove all elements from the initial array that are of the same value as these arguments.

Remember to use Read-Search-Ask if you get stuck. Write your own code.

Here are some helpful links:

Arguments object
Array.prototype.filter()

code by Piyali Dey
pdey@ncsu.edu
*/


function destroyer(arr) {
    // turn the arguments variable into a full array
    var args = Array.prototype.slice.call(arguments);
    // removing the first argument which is the array itself
    args.splice(0,1);
    // filter out the elements that are on the array and keep the ones that are not. 
    return arr.filter(function(element) {
        return args.indexOf(element) === -1;
    });
}
