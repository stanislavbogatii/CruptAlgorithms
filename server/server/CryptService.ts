import crypto from 'crypto';
import * as fs from 'fs';
const desKey = "desKey"

export function encryptDES(text: string) {
    const cipher = crypto.createCipher('des-ede3', desKey);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

export function decryptDES(encryptedText: string) {
    const decipher = crypto.createDecipher('des-ede3', desKey);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

function generateRSAKeys() {
    return crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
        }
    });
}

export const { publicKey, privateKey } = generateRSAKeys();

export function encryptRSA(text: string) {
    const encryptedText = crypto.publicEncrypt({
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_PADDING
    }, Buffer.from(text, 'utf8'));
    return encryptedText.toString('base64');
}

export function decryptRSA(encryptedText: string) {
    const decryptedText = crypto.privateDecrypt({
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PADDING
    }, Buffer.from(encryptedText, 'base64'));

    return decryptedText.toString('utf8');
}

function generateSignatureKeys() {
    return crypto.generateKeyPairSync('ec', {
       namedCurve: 'secp256k1',
       publicKeyEncoding: {
           type: 'spki',
           format: 'pem'
       },
       privateKeyEncoding: {
           type: 'pkcs8',
           format: 'pem'
       }
   });
}

export const { privateKey: privateKeySign, publicKey: publicKeySign } = generateSignatureKeys();

export function generateSignature(message: string) {
    const sign = crypto.createSign('SHA256');
    sign.update(message);
    const signature = sign.sign(privateKeySign, 'base64');
    return signature;
}

export function verifySignature(message: string, signature: string) {
    const verify = crypto.createVerify('SHA256');
    verify.update(message);
    return verify.verify(publicKeySign, signature, 'base64');
}






