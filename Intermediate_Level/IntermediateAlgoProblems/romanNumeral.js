/* Bonfire: Roman Numeral Converter

Convert the given number into a roman numeral.

All roman numerals answers should be provided in upper-case.

Remember to use RSAP if you get stuck. Try to pair program. Write your own code.

Here are some helpful links:
Array.splice() Array.indexOf() Array.join()

Rules to Convert:
1. When a symbol appears after a larger symbol, then, it is added. 
2. When used before, it is substracted. 
3. You also can’t use the same symbol more than 3 times in a row.


Code by Piyali Dey
pdey@ncsu.edu
http://www.freecodecamp.com/piyalidey
*/

var convert = function(num) {

  // Create arrays with default conversion with matching indices.
        var decimalValue = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];
        var romanNumeral = ['I', 'IV', 'V', 'IX', 'X', 'XL', 'L', 'XC', 'C', 'CD', 'D', 'CM', 'M'];

  // Create a copy of num to work on and an empty string variable for the final roman number
        var numCopy = num;
        var romanized = '';

  // While the decimal number is greater than 0,
    while (numCopy > 0) {
    // Loop through the indices of the decimalValue array.
        for (var index = 0; index < decimalValue.length; index++) {
      // Get the maximum decimal number less or equal then the decimal number.
            if (+decimalValue[index] <= numCopy && +decimalValue[+index + 1] > numCopy) {
        // Add the Roman numeral & decrease numCopy by the decimal equivalent.
        romanized += romanNumeral[index];
        numCopy -= decimalValue[index];
            }
        }
    }

  return romanized;
};

convert(36);
Contact GitHub API Training Shop Blog About
