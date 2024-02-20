const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const passport = require('passport');
const mysqlConnection = require('./db/dbconnect');
const Users = mysqlConnection.users;
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const GoogleStrategy = require('passport-google-oidc');
const session = require('express-session');
const cookieSession = require('cookie-session');
const connectEnsureLogin = require('connect-ensure-login');
const mysql = require('mysql2/promise');

require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;

// Use body-parser middleware
app.use(bodyParser.json());

//Enable parsing as urlencoded and json.
app.use(bodyParser.urlencoded({extended:true}));

// Configure Google Auth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'https://ajovault.onrender.com/auth/google-auth-callback',
  scope: ['profile']
}, function verify(issuer, profile, cb) {
  const { users } = mysqlConnection;

  // Check if the user has been previously profiled
  users.findOne({
    where: {
      federatedID: profile.id,
    },
  }).then((existingUser) => {
    if (!existingUser) {
      // User has not been profiled. Go ahead and add the user
      const dpPath = '/node-express-server/views/images/dp_images/default_avatar.png';
      const userEmail = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
  
      // Insert the user
      users.create({
        email: userEmail,
        fullName: profile.displayName,
        federatedID: profile.id,
        dpPath: dpPath,
      }).then((createdUser) => {
        // Insert successful. Return user object
        const user = {
          id: createdUser.id,
          email: userEmail,
          fullName: profile.displayName,
          dpPath: dpPath,
        };
        return cb(null, user);
      }).catch((insertErr) => {
        // User insert error, return the error
        return cb(insertErr);
      });
    } else {
      // User has been previously profiled. Go ahead and select the user
      users.findOne({
        attributes: ['id', 'email', 'fullName', 'dpPath'],
        where: {
          id: existingUser.id,
        },
      }).then((selectedUser) => {
        if (!selectedUser) {
          return cb(null, false);
        }
        return cb(null, selectedUser);
      }).catch((selectErr) => {
        return cb(selectErr);
      });
    }
  }).catch((findErr) => {
    // Database query error, return the error
    return cb(findErr);
  });  
}));    


// Associate User model with the local strategy
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async function(email, password, done) {
  try {
    const user = await Users.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return done(null, false, { message: 'Incorrect email or password.' });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

//Add support for cors middleware and accept only request from own server
const allowedOrigins = [
  'https://ajo-vault-web-app.vercel.app', 
  'https://ajovault.onrender.com', 
  'http://localhost', 
];

var corsOptions = {
  origin: 'https://ajo-vault-web-app.vercel.app',
  credentials: true,
};

app.use(cors(corsOptions));

// Configure sessions
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: true, 
    maxAge: 60 * 60 * 10000, 
    sameSite: 'none',
  }
}));

// initialize passport middleware and attach passport session to app
app.use(passport.initialize()); 
app.use(passport.session()); 

// Serialize user to store in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await Users.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// In a case of same backend/frontend deployment, serve HTML files from the 'views' directory
app.use(express.static('views'));

//import authentication routes
const authRoutes = require('./routes/authRoutes');

//add Google authentication route
app.use('/auth/google-auth', passport.authenticate('google'));

//add other authentication routes
app.use('/auth', authRoutes);

//import utility routes
const utilRoutes = require('./routes/utilRoutes');    
//add utility routes to the app ensuring user is logged in
app.use('/api', connectEnsureLogin.ensureLoggedIn(), utilRoutes);

//catch any errors from middleware
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('Something broke!');
});

// Catch all other routes and send access denied response
app.get('/*', function (req,res) {
  res.status(401).json({"success":"false", "response": "Sorry, access to the requested resource is restricted!"});
  });


//start listening for requests
app.listen(port, function() {console.log('Server started on port:'+port+'/');});







