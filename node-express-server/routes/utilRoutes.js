const express = require('express');
const router = express.Router();
const utilController = require('../controllers/utilController')

// Login User
router.post('/login', authController.loginUser );

module.exports = router;