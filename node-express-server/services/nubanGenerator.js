


module.exports.generateNuban = async (acctSerial) => {
    //Ensure a 9-digit serialNo by doing a zero pad on it
    let serialNumber = String(acctSerial);
    while (serialNumber.length < 9) {
      serialNumber = "0" + serialNumber;
    }

    let ourBankCode = '090'; // placeholder code for code to be issued by the CBN

    try {
      //Concatenate serialNo and generated check-digit to obtain nuban
      let checkDigit = String(generateCheckDigit(serialNumber, ourBankCode));
      let nuban = serialNumber + checkDigit;

      return nuban;
    } catch (err) {      
      throw err; // Re-throw the error to be caught by the caller
    }
  }



//Define the generateCheckDigit function using CBN advised Algorithm
const generateCheckDigit = (serialNumber, ourBankCode) => {
  if (serialNumber.length > 9) {
    throw new Error(
      `Serial number should be at most 9 digits long.`
    );
  }

  const seed = "373373373373";
  let cipher = ourBankCode + serialNumber;
  let sum = 0;

  // Step 1. Calculate A*3+B*7+C*3+D*3+E*7+F*3+G*3+H*7+I*3+J*3+K*7+L*3
  cipher.split("").forEach((item, index) => {
    sum += item * seed[index];
  });

  // Step 2: Calculate Modulo 10 of your result i.e. the remainder after dividing by 10
  sum %= 10;

  // Step 3. Subtract your result from 10 to get the Check Digit
  let checkDigit = 10 - sum;

  // Step 4. If your result is 10, then use 0 as your check digit
  checkDigit = checkDigit == 10 ? 0 : checkDigit;

  return checkDigit;
};
