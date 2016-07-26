/* Bonfire: Check for Palindromes

Return true if the given string is a palindrome. Otherwise, return false.

A palindrome is a word or sentence that's spelled the same way both forward and backward, ignoring
punctuation, case, and spacing.

You'll need to remove punctuation and turn everything lower case in order to check for palindromes.

We'll pass strings with varying formats, such as "racecar", "RaceCar", and "race CAR" among others.

Remember to use RSAP if you get stuck. Try to pair program. Write your own code.

Here are some helpful links:
String.replace() String.toLowerCase()

Code by Piyali Dey
pdey@ncsu..edu
*/


function palindrome(str) {
    // remove punctuations and turn into lower case
  var updatedStr = str.replace(/[\W_]/g, '').toLowerCase();
  var reverseStr = updatedStr.split('').reverse().join('');
  return updatedStr === reverseStr;
}

palindrome('eye');