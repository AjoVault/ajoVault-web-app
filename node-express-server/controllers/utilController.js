const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const cors = require('cors')
const bcrypt = require('bcryptjs');
const mysqlConnection = require('../db/dbconnect');
const Users = mysqlConnection.users;
const passport = require('passport');
const session = require('express-session');
const cookieSession = require('cookie-session');
const connectEnsureLogin = require('connect-ensure-login');
const Sequelize = require('sequelize');

 // Create the strategy using the user model
passport.use(Users.createStrategy());

// serialize and deserialize the user object
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());

const moment = require('moment');
const currenttime = new moment().format('YYYY-MM-DD HH:MM:SS');

process.env.SECRET_KEY = 'ajoVaulSecret';
router.use(cors());

//Login user
const loginUser = (req, res) => {
    passport.authenticate('local', {failureRedirect: '/' });
    res.redirect('/');
}

module.exports = {loginUser}