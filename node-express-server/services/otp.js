const otpGenerator = require('otp-generator');
const OTP_LENGTH = 4;

const OTP_CONFIG = {
  digits: true,
  upperCaseAlphabets: false,
  specialChars: false,
};

module.exports.generateOTP = () => {
  const OTP = otpGenerator.generate(OTP_LENGTH, OTP_CONFIG);
  return OTP;
};
