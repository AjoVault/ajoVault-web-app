const express = require('express');
const router = express.Router();
const utilController = require('../controllers/utilController')

// get a list of commercial banks
router.get('/get-banks', utilController.getBanks);

//add KYC data
router.post('/add-kyc-data', utilController.kycDataCapture);

module.exports = router;