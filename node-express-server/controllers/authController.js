const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const cors = require('cors');
const bcrypt = require('bcryptjs');
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

const { generateOTP } = require('../services/otp');
const { sendMail } = require('../services/mailer');

// Create the strategy using the user model
passport.use(new LocalStrategy(Users.authenticate()));


// Create token generating function
function generateToken(length) {
  return crypto.randomBytes(length).toString('hex');
}

// initialize passport
passport.initialize(); 
passport.session(); 

// Serialize user to store in the session
passport.serializeUser((user, done) => {
    done(null, user.id);
  });

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
    try {
      const user = await Users.findByPk(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  


// Configure Google Auth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: '/auth/google-auth-callback',
    scope: ['profile']
  }, function verify(issuer, profile, cb) {
    //Check if user has previously been profiled with a db query
    mysqlConnection.get('SELECT * FROM users WHERE federatedID = ?', [profile.id], function(err, row) {
        //If db query error, return the error
      if (err) { return cb(err); }

      //If db query is empty, user has not been profiled. Go ahead and add user
      if (!row) {
        const userEmail = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
        mysqlConnection.run('INSERT INTO users (email, fullName, federatedID) VALUES (?,?)', [userEmail, profile.displayName,profile.id], 
        function(err) {
            //If user insert error, return the error
          if (err) {return cb(err);}
          
            //Otherwise, insert successful. Return user object
          var id = this.lastID;
          var user = {
            id: id,
            email: userEmail,
            fullName: profile.displayName
          };
          return cb(null, user);          
        });
      } else {
        //If db query returns a row, user has previously been profiled. Go ahead and select the user
        mysqlConnection.get('SELECT id, email, fullName FROM users WHERE id = ?', [row.user_id], function(err, user) {
          if (err) {return cb(err);}
          if (!row) {return cb(null, false);}
          return cb(null, user);
        });
      }
    });
  }));
    


const moment = require('moment');
const currenttime = new moment().format('YYYY-MM-DD HH:MM:SS');

process.env.SECRET_KEY = 'ajoVaulSecret';
router.use(cors());


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
                const hash = bcrypt.hashSync(newUser.password, 10)
                newUser.password = hash;
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
                          res.json({'email': req.body.email});
                        } catch (error) {
                            res.json({error: 'Unable to complete signup'});
                        }
                    })
                    .catch(err => {
                        res.send('error: ' + err)
                    })
            } else {
                res.json({error: 'User exists' });
            }
        }).catch(err => {
            res.send('error: ' + err);
        })    
  };



//Verify signup email
  module.exports.verifyEmail = async (req, res, next) => {
    const {email, otp} = req.body;
    const verifiedUser = await validateUserSignUp(email, otp);

    if (verifiedUser[0]) {
        passport.authenticate('local', {session: true}, (err, user) => {
            if (err || !user) {
                return res.status(401).json({
                    success: false,
                    message: 'Authentication failed',
                });
            }
            
            const fullName = user.fullName;
            const fullNameArray = fullName.split(" ");
            const firstName = fullNameArray[0];

            const userDetailsToSend = {
                id: user.id,
                email: user.email,
                firstName: firstName,
            };
     
            return res.json({
                success: true,
                message: 'Authentication successful',
                user: userDetailsToSend,
            });
        })(req, res, next);
    } else {
        res.status(401).json({
            success: false,
            message: 'Email validation failed',
        });
    }
};
  
  const validateUserSignUp = async (email, otp) => {
    const verifiedUser = await Users.findOne({where: {email}});
    if (!verifiedUser) {
        return [false, 'User not found'];
    }
    if (verifiedUser && user.otp !== otp) {
        return [false, 'Invalid OTP'];
    }
    verifiedUser = await verifiedUser.update({active: true});
    return verifiedUser;
  };



//Login user
module.exports.loginUser = (req, res) => {
    passport.authenticate('local', {session: true}, (err, user) => {
        if (err || !user) {
            return res.status(401).json({
                success: false,
                message: 'Authentication failed',
            });
        }
        
        const fullName = user.fullName.split(' ');
        const firstName = fullName[0];

        const userDetailsToSend = {
            id: user.id,
            email: user.email,
            firstName: firstName,
        };
 
        return res.json({
            success: true,
            message: 'Authentication successful',
            user: userDetailsToSend,
        });
    })(req, res, next);
}


//Logout user
module.exports.loginUser = (req, res) => {
    req.logout();
    res.redirect('/');
}

//Google Auth 
module.exports.googleAuth = (req, res) => {
    passport.authenticate('google'); //redirects user to Google
}

//Google Auth Callback
module.exports.googleAuthCallback = (req, res) => {    
  passport.authenticate('google', {failureRedirect: '/' }),
  (req, res) => {
    // Authentication successful . req.user contains the user object
    if (req.isAuthenticated()) {
        
        const fullName = user.fullName.split(' ');
        const firstName = fullName[0];
      
        const userDetailsToSend = {
            id: req.user.id,
            email: req.user.email,
            firstName: req.user.name
        };

      // Respond with JSON containing user data
      res.json(userDetailsToSend);
    } else {
      // On authentication failure
      res.status(401).json({ message: 'User not authenticated' });
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
      res.status(401).json({message: 'User not found'});
    }

    // Generate a unique token (you might use a library like crypto or uuid)
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
    res.json({'Success': 'Password reset link sent successfully'});
  } catch (error) {
      res.json({error: 'Unable to complete your request'});
  }

  } catch (error) {
    console.error(error);
    // Handle any error
      res.json({error: 'Unable to complete your request'});
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