const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')

// Login User
router.post('/login', authController.loginUser );

module.exports = router;