/* Bonfire: Boo who

Check if a value is classified as a boolean primitive. Return true or false.

Boolean primitives are true and false.

Remember to use RSAP if you get stuck. Try to pair program. Write your own code.

Here are some helpful links:
Boolean Objects

Code by Piyali Dey
pdey@ncsu.edu
http://www.freecodecamp.com/piyalidey
*/




function booWho(bool) {
  return typeof bool === 'boolean';
}

// test here
booWho(null);
