


function addTogether() {
  let returnValue;
  if (typeof arguments[0] === "number") {
    if (typeof arguments[1] === "undefined") {
      let firstArg = arguments[0];
//      var sumTwoAnd = addTogether(arguments[0]);
      return function(secondVal) {
        let returnValue2;
        if (typeof secondVal === "number") {
          returnValue2=firstArg + secondVal;
        }
        return returnValue2;
      }
//      returnValue = sumTwoAnd;
     }
     else if (typeof arguments[1] === "number") {
      returnValue = arguments[0] + arguments[1];
    }
  }
  return returnValue;
}

addTogether(2,3);
addTogether(2)(3); // 5.
addTogether("http://bit.ly/IqT6zt"); // undefined.
addTogether(2, "3"); // undefined.
addTogether(2)([3]); // undefined.
