const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const passport = require('passport');
const connectEnsureLogin = require('connect-ensure-login');
const mysqlConnection = require('./db/dbconnect');
const session = require('express-session');
const cookieSession = require('cookie-session');

require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;

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

//Enable parsing as urlencoded and json.
app.use(bodyParser.urlencoded({extended:false}));

// Enable parsing requests of content-type - application/json
app.use(express.json());

//Add support for cors middleware and accept only request from own server
var corsOptions = {
    origin: "http://localhost"
  };
app.use(cors(corsOptions));
  
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//import authentication routes
const authRoutes = require('./routes/authRoutes');    
//add authentication routes to the app
app.use('/auth', authRoutes);

//import utility routes
const utilRoutes = require('./routes/utilRoutes');    
//add utility routes to the app ensuring user is logged in
app.use('/api', connectEnsureLogin.ensureLoggedIn(), utilRoutes);

//catch any errors from the middleware
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







