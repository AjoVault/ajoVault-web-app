const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const passport = require('passport');
const mysqlConnection = require('./db/dbconnect');
const Users = mysqlConnection.users;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const connectEnsureLogin = require('connect-ensure-login');
const session = require('express-session');
const cookieSession = require('cookie-session');
const mysql = require('mysql2/promise');

require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;

// Use body-parser middleware
app.use(bodyParser.json());

//Enable parsing as urlencoded and json.
app.use(bodyParser.urlencoded({extended:true}));

//Add support for cors middleware and accept only request from own server
var corsOptions = {
  origin: "http://localhost"
};
app.use(cors(corsOptions));

// Configure Google Auth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env['GOOGLE_CLIENT_ID'],
  clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
  callbackURL: process.env['GOOGLE_AUTH_CALLBACK_URL'],
  scope: ['profile']
}, function verify(issuer, profile, cb) {
  //Check if user has previously been profiled with a db query
  mysqlConnection.get('SELECT * FROM users WHERE federatedID = ?', [profile.id], function(err, row) {
      //If db query error, return the error
    if (err) { return cb(err); }

    //If db query is empty, user has not been profiled. Go ahead and add user
    if (!row) {
      const dpPath = path.posix.join('/node-express-server', 'views', 'images', 'dp_images', 'default_avatar.png');
      const userEmail = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
      mysqlConnection.run('INSERT INTO users (email, fullName, federatedID, dpPath) VALUES (?,?)', [userEmail, profile.displayName,profile.id, dpPath], 
      function(err) {
          //If user insert error, return the error
        if (err) {return cb(err);}
        
          //Otherwise, insert successful. Return user object
        var id = this.lastID;
        var user = {
          id: id,
          email: userEmail,
          fullName: profile.displayName,
          dpPath: dpPath,
        };
        return cb(null, user);          
      });
    } else {
      //If db query returns a row, user has previously been profiled. Go ahead and select the user
      mysqlConnection.get('SELECT id, email, fullName, dpPath FROM users WHERE id = ?', [row.user_id], function(err, user) {
        if (err) {return cb(err);}
        if (!user) {return cb(null, false);}
        return cb(null, user);
      });
    }
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

// Configure sessions
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
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


//import authentication routes
const authRoutes = require('./routes/authRoutes');    
//add authentication routes to the app
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

// Catch all other routes and send to home page
const staticClientPath = __dirname + '/node-express-server/views/';
app.use(express.static(staticClientPath));
app.get('/*', function (req,res) {
    res.sendFile(staticClientPath + "index.html");
  });


//start listening for requests
app.listen(port, function() {console.log('Server started at http://localhost:'+port+'/');});







