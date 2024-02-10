const crypto = require('crypto');
require('dotenv').config();

const algorithm = 'aes-256-cbc'; 
const key = process.env.ENCRYPTION_DECRYPTION_KEY;
const iv = crypto.randomBytes(16);

// Function to encrypt data
function encrypt(text) {
    let cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

// Function to decrypt data
function decrypt(encryptedData, iv) {
    let decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(Buffer.from(encryptedData, 'hex'));
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

module.exports = { encrypt, decrypt };
