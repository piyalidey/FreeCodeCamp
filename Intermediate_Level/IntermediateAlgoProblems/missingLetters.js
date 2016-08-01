/* Bonfire: Missing letters

Find the missing letter in the passed letter range and return it.
If all letters are present in the range, return undefined.

Remember to use RSAP if you get stuck. Try to pair program.

Here are some helpful links:
String.charCodeAt()
String.fromCharCode()

Code by Piyali Dey
pdey@ncsu.edu
http://www.freecodecamp.com/piyalidey
*/


function fearNotLetter(str) {

  for(var i = 0; i < str.length; i++) {
    /* code of current character */
    var code = str.charCodeAt(i);

    /* if code of current character is not equal to first character + no of iteration
    hence character has been escaped */
    if (code !== str.charCodeAt(0) + i) {

      /* if current character has escaped one character find previous char and return */
      return String.fromCharCode(code - 1);
    }  
  }
  return undefined;
}

// test here
fearNotLetter("abce");