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

const axios = require('axios');

const {ninSelfieVerifier} = require('../services/ninSelfieVerifier');
const {generateNuban} = require('../services/nubanGenerator');

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
        return res.status(400).json({"success":"false", "response": "Associated user not found"});
    }
  
    // Check if KYC has been previously captured
    var yesKYC = await caDetails.findOne({where: {userId}});
  
    // if KYC has not been captured. Go ahead and add KYC data
    if (!yesKYC) {
        try {
            const kycRecord = await caDetails.create(newKycInfo);
            
            // If selfie has been captured for user, go ahead and attempt NIN verification
            if (user.hasLiveImg) {
                const NIN = req.body.nin;
                const base64Image = user.base64Image;

                // Call ninSelfieVerifier and await its result
                const isVerified = await ninSelfieVerifier(NIN, base64Image);

                if (!isVerified) {
                    return res.status(500).json({"success":"false", "response": "Could not verify the user at this time"});
                } else {
                    // If verification is successful, generate and assign an account number based off last insert id
                    const acctSerial = kycRecord.id;
                    nuban = await generateNuban(acctSerial);
                    await kycRecord.update({internalAcctNo: nuban});
                    
                    // Set user as KYC verified
                    await kycRecord.update({kycVerified: true});
                    
                    return res.status(200).json({"success":"true", "response": "KYC data saved and verified successfully"});
                }
            }
            
            // If no selfie in profile, inform user that verification will be performed later
            return res.status(200).json({"success":"true", "response": "KYC data saved successfully. Please update your profile with a selfie to enable verification"});
        } catch (err) {
            console.log("Error while saving KYC record:" + err);
            return res.status(500).json({"success":"false", "response": "Error while saving KYC record"})
        }
    } else {        
        return res.status(400).json({"success":"false", "response": "KYC data has previously been captured for this user. Use the update-kyc-data endpoint for modifications."});
    }
};
