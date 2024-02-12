const express = require('express');
const router = express.Router();
const utilController = require('../controllers/utilController')

// get a list of commercial banks
router.get('/get-banks', utilController.getBanks);

//add KYC data
router.post('/add-kyc-data', utilController.kycDataCapture);



//contribution schedule
router.post("/add-cont-schedule", utilController.createContributionSchedule);
router.get("/get-cont-schedule/:userId", utilController.getContributionSchedule);
router.put("/:id", utilController.UpdateContributionSchedule);
router.delete("/:id", utilController.deleteContributionSchedule);

//personalsavings schedule
router.post("/add-personal-savings", utilController.createPersonalSavings);
router.get("/get-personal-savings/:userId", utilController.getPersonalSavings);
router.put("/:userId", utilController.UpdateContributionSchedule);
router.delete("/:userId", utilController.deleteContributionSchedule);

module.exports = router;