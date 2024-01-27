const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const cors = require('cors')
const bcrypt = require('bcryptjs');
const mysqlConnection = require('../db/dbconnect');
const Users = mysqlConnection.users;
const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');
const session = require('express-session');
const cookieSession = require('cookie-session');
const connectEnsureLogin = require('connect-ensure-login');
const Sequelize = require('sequelize');

const { generateOTP } = require('../services/otp');
const { sendMail } = require('../services/mailer');

// Create the strategy using the user model
passport.use(Users.createStrategy());

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
    db.get('SELECT * FROM users WHERE federatedID = ?', [profile.id], function(err, row) {
        //If db query error, return the error
      if (err) { return cb(err); }

      //If db query is empty, user has not been profiled. Go ahead and add user
      if (!row) {
        const userEmail = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
        db.run('INSERT INTO users (email, fullName, federatedID) VALUES (?,?)', [userEmail, profile.displayName,profile.id], 
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
        db.get('SELECT id, email, fullName FROM users WHERE id = ?', [row.user_id], function(err, user) {
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
                            OTP: otpGenerated,
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
    // Successful authentication, req.user contains the user object
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
