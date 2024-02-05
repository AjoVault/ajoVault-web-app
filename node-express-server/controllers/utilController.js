const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const cors = require('cors')
const bcrypt = require('bcryptjs');
const mysqlConnection = require('../db/dbconnect');
const Users = mysqlConnection.users;
const caDetails = mysqlConnection.caDetails;
const ngBanks  = mysqlConnection.ngBanks;
const passport = require('passport');
const session = require('express-session');
const cookieSession = require('cookie-session');
const connectEnsureLogin = require('connect-ensure-login');
const Sequelize = require('sequelize');

const moment = require('moment');
const currenttime = new moment().format('YYYY-MM-DD HH:MM:SS');


// get a list of commercial banks
module.exports.getBanks = async (req, res) => {
    try {
        // Fetch all banks from the ngBanks model
        const banks = await ngBanks.findAll({
          attributes: ['id', 'code', 'name']
        });
    
        // Return the list of banks as JSON
        res.status(200).json({"success":"true", "response": banks});
      } catch (error) {
        console.error('Error fetching banks:', error);
        res.status(500).json({"success":"false", "response": error});
      }
  };
  

// add KYC data
module.exports.kycDataCapture = async (req, res) => {
    const userId = req.body.userId;
    const email = req.body.email;

    var newKycInfo = {
        userId: req.body.userId,
        nin: req.body.nin,
        bvn: req.body.bvn,
        bankId: req.body.bankId,
        externalAcctNo: req.body.externalAcctNo,
        occupation: req.body.occupation,
        created_at: currenttime
    }
  
    // find associated user by email
    var user = await Users.findOne({where: {email}});
  
    // if user is not found
    if (!user) {
        res.status(400).json({"success":"false", "response": "Associated user not found"});
    }
  
    // Check if KYC has been previously captured
    var yesKYC = await caDetails.findOne({where: {userId}});
  
    // if KYC has not been captured
    if (!yesKYC) {
        caDetails.create(newKycInfo)
        .then(kyc => {
            res.status(200).json({"success":"true", "response": "KYC data saved successfully"});
        })
        .catch(err => {
            res.status(500).json({"success":"false", "response": err})
        })
    } else {        
        res.status(400).json({"success":"false", "response": "KYC data has previously been captured for this user. Use the update-kyc-data endpoint for modifications."});
    }
  
  };
  