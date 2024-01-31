const otpGenerator = require('otp-generator');
const OTP_LENGTH = 6;

const OTP_CONFIG = {
  upperCaseAlphabets: true,
  specialChars: false,
};

module.exports.generateOTP = () => {
  const rawOTP = otpGenerator.generate(OTP_LENGTH, OTP_CONFIG);
  const uppercaseOTP = rawOTP.toUpperCase();
  return uppercaseOTP;
};

