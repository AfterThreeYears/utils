module.exports = (sourceDigits) => {
  // Constants:
  const MAXIMUM_NUMBER = 99999999999.99; 
  // Predefine the radix characters and currency symbols for output:
  const CN_ZERO = "零"; 
  const CN_ONE = "壹"; 
  const CN_TWO = "贰"; 
  const CN_THREE = "叁"; 
  const CN_FOUR = "肆"; 
  const CN_FIVE = "伍"; 
  const CN_SIX = "陆"; 
  const CN_SEVEN = "柒"; 
  const CN_EIGHT = "捌"; 
  const CN_NINE = "玖"; 
  const CN_TEN = "拾"; 
  const CN_HUNDRED = "佰"; 
  const CN_THOUSAND = "仟"; 
  const CN_TEN_THOUSAND = "万"; 
  const CN_HUNDRED_MILLION = "亿";
  const CN_POINT = '点';
       
  // Variables:
  let integral;    // Represent integral part of digit number.
  let decimal;    // Represent decimal part of digit number.
  let outputCharacters;    // The output result.
  let parts; 
  let digits, radices, bigRadices;
  let zeroCount; 
  let i, p, d; 
  let quotient, modulus; 
  
  if (sourceDigits === undefined || sourceDigits === null) { 
    throw new Error("不能为空"); 
  }
  sourceDigits = sourceDigits.toString(); 
  if (sourceDigits === "") { 
    throw new Error("不能为空"); 
  } 
  if (sourceDigits.match(/[^,.\d]/) !== null) { 
    throw new Error("含有无效字符！"); 
  } 
  if ((sourceDigits).match(/^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/) === null) { 
    throw new Error("数字的格式不正确！"); 
  } 
       
  // Normalize the format of input digits:
  sourceDigits = sourceDigits.replace(/,/g, "");    // Remove comma delimiters.
  sourceDigits = sourceDigits.replace(/^0+/, "");    // Trim zeros at the beginning.
  // Assert the number is not greater than the maximum number.
  if (Number(sourceDigits) > MAXIMUM_NUMBER) { 
    throw new Error("金额过大，应小于1000亿元！"); 
  } 
       
  // Process the coversion from currency digits to characters:
  // Separate integral and decimal parts before processing coversion:
  parts = sourceDigits.split("."); 
  if (parts.length > 1) { 
      integral = parts[0]; 
      decimal = parts[1]; 
  } else { 
    integral = parts[0]; 
    decimal = ""; 
  } 
  // Prepare the characters corresponding to the digits:
  digits = [CN_ZERO, CN_ONE, CN_TWO, CN_THREE, CN_FOUR, CN_FIVE, CN_SIX, CN_SEVEN, CN_EIGHT, CN_NINE];
  radices = ["", CN_TEN, CN_HUNDRED, CN_THOUSAND];
  bigRadices = ["", CN_TEN_THOUSAND, CN_HUNDRED_MILLION];
  // Start processing:
  outputCharacters = ""; 
  // Process integral part if it is larger than 0:
  if (Number(integral) > 0) {
    zeroCount = 0; 
    for (i = 0; i < integral.length; i++) { 
      p = integral.length - i - 1; 
      d = integral.substr(i, 1); 
      quotient = p / 4; 
      modulus = p % 4;
      if (+d === 0) {
          zeroCount++; 
      } else { 
        if (zeroCount > 0) { 
          outputCharacters += digits[0];
        } 
        zeroCount = 0; 
        outputCharacters += digits[Number(d)] + radices[modulus]; 
        } 
      if (modulus == 0 && zeroCount < 4) { 
        outputCharacters += bigRadices[quotient]; 
        zeroCount = 0; 
      } 
    } 
  } else {
    outputCharacters += digits[0];
  }
  // Process decimal part if there is:
  if (decimal != "") {
    outputCharacters += CN_POINT;
    for (i = 0; i < decimal.length; i++) {
      d = decimal.substr(i, 1); 
      if (+d !== 0) { 
        outputCharacters += digits[Number(d)];
      } 
    } 
  } 
  // Confirm and return the final output string:
  if (outputCharacters == "") { 
    outputCharacters = CN_ZERO; 
  } 
  outputCharacters = outputCharacters; 
  return outputCharacters; 
};
