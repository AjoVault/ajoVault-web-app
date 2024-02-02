const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mysqlConnection = require('../db/dbconnect');
const Users = mysqlConnection.users;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oidc');
const session = require('express-session');
const cookieSession = require('cookie-session');
const connectEnsureLogin = require('connect-ensure-login');
const Sequelize = require('sequelize');
const mysql = require('mysql2/promise');
const path = require('path');

const { generateOTP } = require('../services/otp');
const { sendMail } = require('../services/mailer');

// Create token generating function
function generateToken(length) {
  return crypto.randomBytes(length).toString('hex');
}

// Create an email masking function
function maskEmail(email) {
  const atIndex = email.indexOf('@');

  if (atIndex !== -1) {
    const username = email.slice(0, atIndex);
    const maskedUsername = username.slice(0, 3) + '*'.repeat(username.length - 5) + username.slice(-2);
    const domain = email.slice(atIndex);
    const maskedEmail = maskedUsername + domain;

    return maskedEmail;
  }

  return email;
}


const moment = require('moment');
const currenttime = new moment().format('YYYY-MM-DD HH:MM:SS');


//SignUp user
module.exports.signupUser = async (req, res) => {
    var newUser = {
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        promoCode: req.body.promoCode,
        role: req.body.role,
        created_at: currenttime
    }

    Users.findOne({
        where: Sequelize.or({email: req.body.email}, {phone: req.body.phone})
    })
    .then(user => {
            if (!user) {
                const hashedPassword = bcrypt.hashSync(req.body.password, 10);             
                newUser.password = hashedPassword;
                const dpPath = path.posix.join('/node-express-server', 'views', 'images', 'dp_images', 'default_avatar.png');
                newUser.dpPath = dpPath;
                const otpGenerated = generateOTP();
                newUser.otp = otpGenerated;
                Users.create(newUser)
                    .then(user => {
                        try {
                            sendMail({
                            to: req.body.email,
                            subject: 'AjoVault Signup OTP',
                            body: `
                            <div
                              class="container"
                              style="max-width: 90%; margin: auto; padding-top: 20px"
                            >
                              <h2>You are almost there</h2>
                              <p style="margin-bottom: 30px;">Please use the following OTP to verify your email address</p>
                              <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${otpGenerated}</h1>
                         </div>
                          `,  
                          });
                          const maskedEmail = maskEmail(req.body.email);
                          const userDetailsToSend = {
                            id: user.id,
                            email: user.email,
                            maskedEmail: maskedEmail,         
                        };
                          res.json({"success":"true", "response": userDetailsToSend});
                        } catch (error) {
                            res.json({"success":"false", "response": "Unable to complete signup"});
                        }
                    })
                    .catch(err => {
                        res.json({"success":"false", "response": err})
                    })
            } else {
                res.json({"success":"false", "response": "User exists"});
            }
        }).catch(err => {
            res.json({"success":"false", "response": err});
        })    
  };



//Verify signup email
  module.exports.verifyEmail = async (req, res, next) => {
    const {email, otp} = req.body;
    const verifiedUser = await validateUserSignUp(email, otp);

    if (verifiedUser[0]) {

            const user = await Users.findOne({where: { email }});

              req.login(user, (err) => {
                if (err) {
                  return res.status(500).json({ success: false, "response": "Authentication failed"});
                }

                // The user is now logged in                            
                const fullName = user.fullName;
                const fullNameArray = fullName.split(" ");
                const firstName = fullNameArray[0];
                const dpPath = path.posix.join('/node-express-server', 'views', 'images', 'dp_images', 'default_avatar.png');
                const userDetailsToSend = {
                    id: user.id,
                    email: user.email,
                    firstName: firstName,
                    dpPath: dpPath,             
                };
        
                return res.json({"success":"true", "response": userDetailsToSend});
              });
    } else {
        res.status(401).json({"success":"false", "response":"Email validation failed",
        });
    }
};

  const validateUserSignUp = async (email, otp) => {
    var verifiedUser = await Users.findOne({where: {email}});
    if (!verifiedUser) {
        return [false, 'User not found'];
    }
    if (verifiedUser && verifiedUser.otp !== otp) {
        return [false, 'Invalid OTP'];
    }
    verifiedUser = await verifiedUser.update({active: true});
    return [true, verifiedUser];
  };


//Login user
module.exports.loginUser = async (req, res, next) => {
  
  const {email, password} = req.body;
  const verifiedUser = await loginManual(email, password);

  if (verifiedUser[0]) {

    const user = await Users.findOne({where: { email }});

      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ success: false, "response": "Authentication failed"});
        }

        // The user is now logged in                            
        const fullName = user.fullName;
        const fullNameArray = fullName.split(" ");
        const firstName = fullNameArray[0];
        const dpPath = user.dpPath;
        const userDetailsToSend = {
            id: user.id,
            email: user.email,
            firstName: firstName,
            dpPath: dpPath,             
        };

        return res.json({"success":"true", "response": userDetailsToSend});
      });
} else {
res.status(401).json({"success":"false", "response":"Username or Password Incorrect",
});
}

}

const loginManual = async (email, password) => {
  var verifiedUser = await Users.findOne({where: {email}});
  if (!verifiedUser) {
      return [false, 'User not found'];
  }
  if (verifiedUser && !(await bcrypt.compare(password, verifiedUser.password))) {
      return [false, 'Incorrect Password'];
  }
  
  return [true, verifiedUser];
};




//Logout user
module.exports.logoutUser = (req, res) => {
  req.logout(function(err) {
      if (err) {
          return res.json({"success": "false", "response": "Error logging out"});
      }
      return res.json({"success": "true", "response": "User logged out successfully"});
  });
}

//Google Auth - redirects user to Google
module.exports.googleAuth = (req, res) => {
  passport.authenticate('google', {scope: ['profile', 'email']});
}

//Google Auth Callback
module.exports.googleAuthCallback = () => {
  passport.authenticate('google', {failureRedirect: '/auth/login' }),
  (req, res) => {
    // Authentication successful. req.user contains the user object
    if (req.isAuthenticated()) {
        
        const fullName = req.user.fullName.split(' ');
        const firstName = fullName[0];
      
        const userDetailsToSend = {
            id: req.user.id,
            email: req.user.email,
            firstName: req.user.name
        };

      // Respond with JSON containing user data
      res.redirect('/index.html');    // static page redirect  
      
      // standard usage redirect 
      //const encodedData = encodeURIComponent(JSON.stringify(userDetailsToSend));
      //res.redirect(`/dashboard?user=${encodedData}`);      
    } else {
      // On authentication failure
      res.redirect('/login');
      //res.status(401).json({"success":"false", "response":"User not authenticated"});
    }
  }

}


//Forgotten user password
module.exports.forgottenPassword = async (req, res) => {
  const {email} = req.body;

  try {
    // Execute query to retrieve the user based on the email
    const [rows] = await mysqlConnection.query('SELECT * FROM users WHERE email = ?', [email]);

    if (!rows || !rows.length) {
      // Handle case where email is not found
      res.status(401).json({"success":"false", "response":"User not found"});
    }

    // Generate a unique token 
    const resetToken = generateToken(32);

    // Save the reset token and its expiration date in the user record
    await mysqlConnection.query('UPDATE users SET resetToken = ?, resetTokenExpiration = ? WHERE id = ?',
      [resetToken, Date.now() + 3600000, rows[0].id]
    );

    // Send an email with the reset link
    const resetLink = `https://ajo-vault.com/reset-password/${resetToken}`;
    
    try {
      sendMail({
      to: req.body.email,
      subject: 'AjoVault Password Reset Link',
      body: `
      <div
        class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px"
      >
        <h2>Your password reset link is here</h2>
        <p style="margin-bottom: 30px;">Please Click on the following link to reset your password:</p>
        <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;"><a href="${resetLink}" target="_blank"> AjoVault Password Reset Link <a/></h1>
   </div>
    `,  
    });
    res.json({"success":"true", "response": "Password reset link sent successfully"});
  } catch (error) {
      res.json({"success":"false", "response": "Unable to complete your request"});
  }

  } catch (error) {
    console.error(error);
    // Handle any error
      res.json({"success":"false", "response":"Unable to complete your request"});
  }
};


// Password reset token bearer
module.exports.passwordResetToken = async (req, res) => {
  const { token } = req.params;

  try {
    // Execute a MySQL query to retrieve the user based on the reset token
    const [rows] = await mysqlConnection.query('SELECT * FROM users WHERE resetToken = ? AND resetTokenExpiration > ?', 
    [token, Date.now()]);

    if (!rows || !rows.length) {
      // Handle invalid or expired token
      return res.redirect('/reset-password-invalid');
    }

    // Render a form for the user to enter a new password
    res.render('/reset-password', { token });
  } catch (error) {
    console.error(error);
    // Handle any other error
    res.redirect('/reset-password-invalid');
  }
};


// Password reset form submission
module.exports.passwordReset = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  newPassword = bcrypt.hashSync(newPassword, 10)

  try {
    // Execute a MySQL query to retrieve the user based on the reset token
    const [rows] = await pool.query('SELECT * FROM users WHERE resetToken = ? AND resetTokenExpiration > ?', [token, Date.now()]);

    if (!rows || !rows.length) {
      // Handle invalid or expired token
      return res.redirect('/reset-password-invalid');
    }

    // Update the user's password and clear the reset token
    await pool.query('UPDATE users SET password = ?, resetToken = NULL, resetTokenExpiration = NULL WHERE id = ?', 
    [newPassword, rows[0].id]);

    // Redirect to a page indicating that the password has been reset
    res.redirect('/password-reset-successful');
  } catch (error) {
    console.error(error);
    // Handle any other error
    res.redirect('/reset-password-invalid');
  }
};