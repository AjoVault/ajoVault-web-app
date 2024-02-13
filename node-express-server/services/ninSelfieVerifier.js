const fs = require('fs').promises;
const { promisify } = require('util');
const axios = require('axios');
require('dotenv').config();

module.exports.ninSelfieVerifier = async (NIN, base64Image) => {
    try {
        // Set request parameters
        const apiUrl = 'https://sandbox.dojah.io/api/v1/kyc/nin/verify';
        const requestData = {
            "nin": NIN,
            "selfie_image": base64Image
          };

        // Make the API call
        const response = await axios.post(apiUrl, requestData, {
            headers: {      
            'Accept': 'text/plain',
            'AppId': process.env.DOJAH_APP_ID,
            'Content-Type': 'application/json',
            'Authorization': process.env.DOJAH_KEY
            },
        });

        // Collect response data
        const responseData = response.data;

        // Parse the API response data
        const confidenceValue = responseData.entity.selfie_verification.confidence_value;
        const matchValue = responseData.entity.selfie_verification.match;

        // Check if confidence_value and matchValue are both positive
        const isVerified = confidenceValue > 0 && matchValue > 0;
        
        return isVerified;
    } catch (err) {
        console.error("This is an api call error:", err);
        throw err; // Re-throw the error to be caught by the caller
    }
};
