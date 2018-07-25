var Person = function(firstAndLast) {
  // Complete the method below and implement the others similarly
  let fullName=firstAndLast
  let full=fullName.split(" ");

  this.getFirstName = function() {
    return full[0];
  };
  this.getLastName = function() {
    return full[1];
  };
  this.setFirstName = function(newName) {
    full[0] = newName;
  };
  this.setLastName = function(newLast) {
    full[1] = newLast;
  };

  this.getFullName = function() {
    return this.getFirstName() + " " + this.getLastName();
  };

  this.setFullName = function(firstAndLast) {
    fullName=firstAndLast;
    full=fullName.split(" ");
  };

};

var bob = new Person('Bob Ross');
bob.getFullName();

Object.keys(bob).length; // 6.
bob instanceof Person; // true.
bob.firstName; // undefined.
bob.lastName; // undefined.
bob.getFirstName(); // "Bob".
bob.getLastName(); // "Ross".
bob.getFullName(); // "Bob Ross".
bob.getFullName(); // "Haskell Ross" after bob.setFirstName("Haskell").
bob.getFullName(); // "Haskell Curry" after bob.setLastName("Curry").
bob.getFullName(); // "Haskell Curry" after bob.setFullName("Haskell Curry").
bob.getFirstName(); // "Haskell" after bob.setFullName("Haskell Curry").
bob.getLastName(); // "Curry" after bob.setFullName("Haskell Curry").
