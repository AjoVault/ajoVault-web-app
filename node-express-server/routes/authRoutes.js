const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connectEnsureLogin = require('connect-ensure-login');
const authController = require('../controllers/authController');

// SignUp User
router.post('/signup', authController.signupUser);

// Verify SignUp Email
router.post('/verify', authController.verifyEmail);

// Create User PIN
//router.post('/createUserPIN', passport.authenticate('jwt', { session: false }), authController.createUserPIN);
router.post('/createUserPIN', authController.createUserPIN);

// Login User
router.post('/login', authController.loginUser);

// Google auth callback
router.get('/google-auth-callback', authController.googleAuthCallback);

// Handle forgotten user password
router.get('/forgotten-password', authController.forgottenPassword);

// Password reset token bearer
router.get('/password-reset/:token', authController.passwordResetToken);

// Password reset form submission
router.get('/reset-password/:token', authController.passwordReset);

// Logout User
router.post('/logout', authController.logoutUser);

module.exports = router;