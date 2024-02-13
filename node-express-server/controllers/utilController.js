const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const cors = require('cors')
const bcrypt = require('bcryptjs');
const mysqlConnection = require('../db/dbconnect');
const Users = mysqlConnection.users;
const caDetails = mysqlConnection.caDetails;
const ngBanks  = mysqlConnection.ngBanks;
const Pool = mysqlConnection.contributionschedule;
const PersonalSavings = mysqlConnection.personalsavings;
const passport = require('passport');
const session = require('express-session');
const cookieSession = require('cookie-session');
const connectEnsureLogin = require('connect-ensure-login');
const Sequelize = require('sequelize');

const axios = require('axios');

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
const {ninSelfieVerifier} = require('../services/ninSelfieVerifier'); // Import the NIN/Selfie verification function
const {generateNuban} = require('../services/nubanGenerator'); // Import the NUBAN generating function
const { encrypt } = require('../services/encryptDecrypt'); // Import the encryption utility function

module.exports.kycDataCapture = async (req, res) => {
    const userId = req.body.userId;
    const email = req.body.email;

    // Encrypt sensitive information
    const encryptedNIN = encrypt(req.body.nin);
    const encryptedBVN = encrypt(req.body.bvn);
    const encryptedExternalAcctNo = encrypt(req.body.externalAcctNo);

    var newKycInfo = {
        userId: req.body.userId,
        nin: encryptedNIN.encryptedData,
        nin_iv: encryptedNIN.iv,
        bvn: encryptedBVN.encryptedData,
        bvn_iv: encryptedBVN.iv,
        bankCode: req.body.bankCode,
        externalAcctNo: encryptedExternalAcctNo.encryptedData,
        externalAcctNo_iv: encryptedExternalAcctNo.iv,
        occupation: req.body.occupation,
        created_at: currenttime
    }
  
    // find associated user by email
    var user = await Users.findOne({where: {email}});
  
    // if user is not found
    if (!user) {
        return res.status(400).json({"success":"false", "response": "Associated user not found"});
    }
  
    // Check if KYC has previously been captured
    var yesKYC = await caDetails.findOne({where: {userId}});
  
    // if KYC has not been captured. Go ahead and add KYC data
    if (!yesKYC) {
        try {
            const kycRecord = await caDetails.create(newKycInfo);            
            await user.update({base64Image: req.body.base64Image});
            
            // Go ahead and attempt NIN verification
            const NIN = req.body.nin;
            const base64Image = req.body.base64Image;

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
            
        } catch (err) {
            console.log("Error while processing KYC data:" + err);
            return res.status(500).json({"success":"false", "response": "Error while processing KYC data"})
        }
    } else {
        return res.status(400).json({"success":"false", "response": "KYC data has previously been captured for this user. Use the update-kyc-data endpoint for modifications."});
    }
};


  //Personal Savings Controller  
  // create PersonalSavings Schedule
  module.exports.createPersonalSavings = async (req, res) => {

    let savingsDetails = {
      userID: req.body.userId,
      debitAmount: req.body.debitAmount,
      savingsFrequency: req.body.savingsFrequency,
      savingsDuration: req.body.savingsDuration,
      debitDate: req.body.debitDate,
      savingsTarget: req.body.savingsTarget,
    };
  
    try {
      const scheduleRecord = await PersonalSavings.create(savingsDetails);          
      
      //get customer bank and update savingsDetails
      const bankQuery = await caDetails.findOne({
        where: { userId: req.body.userId},
        attributes: ['bankCode']
      });      
      savingsDetails.bank = bankQuery.bankCode;

      // Generate the Okra payment authorization link
      const linkReqResponse = await payLinkGenerator(savingsDetails);
    
      const payAuthLink = linkReqResponse.payLink;
      const payAuthID = linkReqResponse.payID;
      
      if (!linkReqResponse.status) {
          return res.status(500).json({"success":"false", "response": "Could not generate a payment authorization link"});
      } else {
          // If link generation is successful, set payment authorization ID
          await scheduleRecord.update({payAuthID: payAuthID});
          
          return res.status(200).json({"success":"true", "response ": payAuthLink});
      }
      
    } catch (err) {
      console.log("Error while processing Savings Schedule:" + err);
      return res.status(500).json({"success":"false", "response": "Error while processing Savings Schedule"})
    }
  };
  
  //get PersonalSavings
  module.exports.getPersonalSavings = async (req, res) => {
    let id = req.params.userId;
    const details = await PersonalSavings.findOne({ where: { id: id } });
    return res.status(200).send(details);
  };
  
  //update PersonalSavings
  module.exports.UpdatePersonalSavings = async (req, res) => {
    let id = req.params.userId;
  
    const details = await PersonalSavings.update(req.body, { where: { id: id } });
    return res.status(200).send(details);
  };
  
  //delete PersonalSavings
  module.exports.deletePersonalSavings = async (req, res) => {
    let id = req.params.userId;
  
    await PersonalSavings.destroy({ where: { id: id } });
    return res.status(200).send("details has been deleted");
  };


//pooled contribution post request
module.exports.createContributionSchedule = async (req, res) => {
    let poolDetails = {
      userID: req.body.userId,
      debitAmount: req.body.debitAmount,
      savingsFrequency: req.body.savingsFrequency,
      savingsDuration: req.body.savingsDuration,
      debitDate: req.body.debitDate,
    };
  
try {
  const scheduleRecord = await Pool.create(savingsDetails);          
  
  //get customer bank and update savingsDetails
  const bankQuery = await caDetails.findOne({
    where: { userId: req.body.userId},
    attributes: ['bankCode']
  });      
  poolDetails.bank = bankQuery.bankCode;

  // Generate the Okra payment authorization link
  const linkReqResponse = await payLinkGenerator(poolDetails);

  const payAuthLink = linkReqResponse.payLink;
  const payAuthID = linkReqResponse.payID;
  
  if (!linkReqResponse.status) {
      return res.status(500).json({"success":"false", "response": "Could not generate a payment authorization link"});
  } else {
      // If link generation is successful, set payment authorization ID
      await scheduleRecord.update({payAuthID: payAuthID});
      
      return res.status(200).json({"success":"true", "response ": payAuthLink});
  }
  
} catch (err) {
  console.log("Error while processing Pool Schedule:" + err);
  return res.status(500).json({"success":"false", "response": "Error while processing Pool Schedule"})
}
  };
  
  //get pooled contribution
  module.exports.getContributionSchedule = async (req, res) => {
    let id = req.params.userId;
    const pool = await Pool.findOne({ where: { id: id } });
    return res.status(200).send(pool);
  };
  
  //update pooled contribution
  module.exports.UpdateContributionSchedule = async (req, res) => {
    let id = req.params.userId;
  
    const pool = await Pool.update(req.body, { where: { id: id } });
    return res.status(200).send(pool);
  };
  
  //delete pooled contribution
  module.exports.deleteContributionSchedule = async (req, res) => {
    let id = req.params.userId;
  
    await Pool.destroy({ where: { id: id } });
    return res.status(200).send("Pool has been deleted");
  };
  
  

