
const nodemailer = require('nodemailer');
require('dotenv').config();

const MAIL_SETTINGS = {
    service: 'gmail',
    auth: {
      user: process.env.MAIL_EMAIL,
      pass: process.env.MAIL_PASSWORD,
    },
  }
      
const transporter = nodemailer.createTransport(MAIL_SETTINGS);

  module.exports.sendMail = async (params) => {
    try {
      let info = await transporter.sendMail({
        from: MAIL_SETTINGS.auth.user,
        to: params.to, 
        subject: params.subject, 
        html: params.body,
      });
      return info;
    } catch (error) {
      console.log(error);
      return false;
    }
  };