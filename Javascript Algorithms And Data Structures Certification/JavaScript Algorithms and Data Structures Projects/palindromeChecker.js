// Return true if the given string is a palindrome. Otherwise, return false.

// A palindrome is a word or sentence that's spelled the same way both forward and backward, ignoring punctuation, case, and spacing.

// Note
// You'll need to remove all non-alphanumeric characters (punctuation, spaces and symbols) and turn everything into the same case (lower or upper case) in order to check for palindromes.

// We'll pass strings with varying formats, such as "racecar", "RaceCar", and "race CAR" among others.

// We'll also pass strings with special symbols, such as "2A3*3a2", "2A3 3a2", and "2_A3*3#A2".

function palindrome(str) {
  let isPalindrome=true;
  let myStr=str.toLowerCase().match(/[a-z0-9]/g);
  let myStrLen=myStr.length;
  for (let i=0; i<Math.round(myStrLen/2); i++) {
    if (myStr[i] != myStr[myStrLen-(i+1)]) {
      isPalindrome=false;
      break;
    }
  }
  // Good luck!
  return isPalindrome;
}



palindrome("eye"); // true
palindrome("race car"); // true.
palindrome("not a palindrome"); // false.
palindrome("A man, a plan, a canal. Panama"); // true.
palindrome("never odd or even"); // true.
palindrome("nope"); // false.
palindrome("almostomla"); // false.
palindrome("My age is 0, 0 si ega ym."); // true.
palindrome("1 eye for of 1 eye."); // false.
palindrome("0_0 (: /-\ :) 0-0"); // true.
palindrome("five|\_/|four"); //false
