const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysqlConnection = require('./db/dbconnect');
const Users = mysqlConnection.users;

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS middleware
app.use(cors({ 
  origin: '*', 
  credentials: true , 
  allowedHeaders: ['Authorization', 'Content-Type'],
}));

// Initialize passport middleware
app.use(passport.initialize());


// Configure JWT options
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SESSION_SECRET,
};
// Create JWT strategy
passport.use(new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
  try {
    // Retrieve user information from your database
    console.log(jwtPayload.sub);
    const user = await Users.findByPk(jwtPayload.sub);
    
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
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

// Serialize user to generate JWT
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from JWT
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
//add authentication routes
app.use('/auth', authRoutes);


//import utility routes
const utilRoutes = require('./routes/utilRoutes');
//add utility routes to the app ensuring user is authenticated
//app.use('/api', passport.authenticate('jwt', { session: false }), utilRoutes);
app.use('/api', utilRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something broke!');
});

// Catch all other routes and send access denied response
app.get('/*', function (req, res) {
  res.status(401).json({ success: false, response: 'Sorry, access to the requested resource is restricted!' });
});

// Start listening for requests
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
