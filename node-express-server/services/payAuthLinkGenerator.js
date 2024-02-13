const fs = require('fs').promises;
const { promisify } = require('util');
const axios = require('axios');
const moment = require('moment');
require('dotenv').config();

function computeDebitEndDate(scheduleDetails) {
    const { debitAmount, savingsFrequency, debitStartDate, savingsTarget } = scheduleDetails;
    const startDate = moment(debitStartDate);
    let endDate;

    if (savingsFrequency === 'days') {
        const days = Math.ceil(savingsTarget / debitAmount);
        endDate = startDate.clone().add(days, 'days');
    } else if (savingsFrequency === 'weeks') {
        const weeks = Math.ceil(savingsTarget / debitAmount);
        endDate = startDate.clone().add(weeks, 'weeks');
    } else if (savingsFrequency === 'months') {
        const months = Math.ceil(savingsTarget / debitAmount);
        endDate = startDate.clone().add(months, 'months');
    } else {
        throw new Error('Invalid savings frequency');
    }

    return endDate.format('YYYY-MM-DD');
}

module.exports.payLinkGenerator = async (scheduleDetails) => {

    //get debit endDate
    const endDate = computeDebitEndDate(scheduleDetails);

    try {
        // Set request parameters
        const apiUrl = ' https://api.okra.ng/v2/sandbox/pay/link/create';
        const requestData = {
            "amount": scheduleDetails.debitAmount,
            "name": "AjoVault Savings Schedule authorization link",
            "currency": "NGN",
            "note": "AjoVault Savings Schedule authorization link",
            "countries": "NG",
            "account": "Our Okra Account",
            "type": "recurring",
            "schedule": {
                "interval": scheduleDetails.savingsFrequency,
                "startDate": scheduleDetails.debitDate,
                "endDate": endDate,
            },
            "filter": {
              "filter": {
                "banks": [
                    scheduleDetails.bank
                ]
              }
            },
            "success_url": "/",
            "callback_url": "/api/pay-auth-callback",
            "redirect_url": "/",
          };

        // Make the API call
        const response = await axios.post(apiUrl, requestData, {
            headers: {      
            'Accept': 'text/plain',
            'AppId': process.env.Okra_APP_ID,
            'Content-Type': 'application/json',
            'Authorization': process.env.Okra_KEY
            },
        });

        // Collect response data
        const responseData = response.data;

        // Parse the API response data
        const payAuthLink = responseData.surl;
        const payAuthID = responseData._id;
        
        const linkReqResponse = {"status":true, "payLink": payAuthLink, "payID": payAuthID};        
        return linkReqResponse;

    } catch (err) {
        console.error("This is an api call error:", err);
        throw err; 
    }
};
