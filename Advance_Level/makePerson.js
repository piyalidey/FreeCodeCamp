/* Bonfire: Make a Person 

Fill in the object constructor with the following methods below:

getFirstName()
getLastName()
getFullName()
setFirstName(first)
setLastName(last)
setFullName(firstAndLast)

Run the tests to see the expected output for each method.

The methods that take an argument must accept only one argument and it has to be a string.

These methods must be the only available means of interacting with the object.

Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.

Here are some helpful links:
Closures
Details of the Object Model

pdey@ncsu.edu
http://www.freecodecamp.com/piyalidey
*/



var Person = function(firstAndLast) {

  var fullName = firstAndLast;
  var arr = fullName.split(' ');

  this.getFirstName = function() {
    return arr[0];
  };

  this.getLastName = function() {
    return arr[1];
  };

  this.getFullName = function() {
    return fullName;
  };

  this.setFirstName = function(first) {
    arr[0] = first;
    fullName = arr.join(' ');
  };

  this.setLastName = function(last) {
    arr[1] = last;
    fullName = arr.join(' ');
  };

  this.setFullName = function(firstAndLast) {
    fullName = firstAndLast;
    arr = fullName.split(' ');
  };
};

var bob = new Person('Bob Ross');
bob.getFullName();