const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')

// SignUp User
router.post('/signup', authController.signupUser);

// Verify SignUp Email
router.post('/verify', authController.verifyEmail);

// Login User
router.post('/login', authController.loginUser);

// Google auth
router.get('/google-auth', authController.googleAuth);

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