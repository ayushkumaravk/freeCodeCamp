// Convert the given number into a roman numeral.
// All roman numerals answers should be provided in upper-case.

function convertToRoman(num) {
  let thousands = ["", "M", "MM", "MMM"];
  let hundreds = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];
  let dozens = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
  let singles = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

  return thousands[Math.floor(num / 1000)]+
         hundreds[Math.floor(num % 1000 / 100)]+
         dozens[Math.floor(num % 100 / 10)]+
         singles[num % 10]
//  return num;
}

convertToRoman(2); // "II".
convertToRoman(3); // "III".
convertToRoman(4); // "IV".
convertToRoman(5); // "V".
convertToRoman(9); // "IX".
convertToRoman(12); // "XII".
convertToRoman(16); // "XVI".
convertToRoman(29); // "XXIX".
convertToRoman(44); // "XLIV".
convertToRoman(45); // "XLV"
convertToRoman(68); // "LXVIII"
convertToRoman(83); // "LXXXIII"
convertToRoman(97); // "XCVII"
convertToRoman(99); // "XCIX"
convertToRoman(400); // "CD"
convertToRoman(500); // "D"
convertToRoman(501); // "DI"
convertToRoman(649); // "DCXLIX"
convertToRoman(798); // "DCCXCVIII"
convertToRoman(891); // "DCCCXCI"
convertToRoman(1000); // "M"
convertToRoman(1004); // "MIV"
convertToRoman(1006); // "MVI"
convertToRoman(1023); // "MXXIII"
convertToRoman(2014); // "MMXIV"
convertToRoman(3999); // "MMMCMXCIX"
