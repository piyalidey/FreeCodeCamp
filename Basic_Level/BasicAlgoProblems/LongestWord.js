/* Bonfire: Find the Longest Word in a String

Return the length of the longest word in the provided sentence.

Your response should be a number.

Remember to use RSAP if you get stuck. Try to pair program. Write your own code.

Here are some helpful links:
String.split() String.length

Code by Piyali Dey
pdey@ncsu.edu
*/


function findLongestWord(str) {
    //split the string into array of strings
    var splitStr= str.split(' ');
    var longestWord = 0;

    for (var i =0; i < splitStr.length ; i++) {
        // if splitStr[i].length is greater than the word the store it in longestWord
        if (splitStr [i]. length > longestWord)  {
            longestWord = splitStr[i].length;
        }
        return longestWord;
    }