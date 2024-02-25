export function romanToNumber(roman) {
  let romanNumerals = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  let result = 0;
  for (let i = 0; i < roman.length; i++) {
    if (romanNumerals[roman[i]] < romanNumerals[roman[i + 1]]) {
      result -= romanNumerals[roman[i]];
    } else {
      result += romanNumerals[roman[i]];
    }
  }
  return result;
}

export function numberToRoman(number) {
  let romanNumerals = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };
  let result = "";
  for (let key in romanNumerals) {
    while (number >= romanNumerals[key]) {
      result += key;
      number -= romanNumerals[key];
    }
  }
  return result;
}
