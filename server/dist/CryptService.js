"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySignature = exports.generateSignature = exports.publicKeySign = exports.privateKeySign = exports.decryptRSA = exports.encryptRSA = exports.privateKey = exports.publicKey = exports.decryptDES = exports.encryptDES = void 0;
const crypto_1 = __importDefault(require("crypto"));
const desKey = "desKey";
function encryptDES(text) {
    const cipher = crypto_1.default.createCipher('des-ede3', desKey);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}
exports.encryptDES = encryptDES;
function decryptDES(encryptedText) {
    const decipher = crypto_1.default.createDecipher('des-ede3', desKey);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
exports.decryptDES = decryptDES;
function generateRSAKeys() {
    return crypto_1.default.generateKeyPairSync('rsa', {
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
_a = generateRSAKeys(), exports.publicKey = _a.publicKey, exports.privateKey = _a.privateKey;
function encryptRSA(text) {
    const encryptedText = crypto_1.default.publicEncrypt({
        key: exports.publicKey,
        padding: crypto_1.default.constants.RSA_PKCS1_PADDING
    }, Buffer.from(text, 'utf8'));
    return encryptedText.toString('base64');
}
exports.encryptRSA = encryptRSA;
function decryptRSA(encryptedText) {
    const decryptedText = crypto_1.default.privateDecrypt({
        key: exports.privateKey,
        padding: crypto_1.default.constants.RSA_PKCS1_PADDING
    }, Buffer.from(encryptedText, 'base64'));
    return decryptedText.toString('utf8');
}
exports.decryptRSA = decryptRSA;
function generateSignatureKeys() {
    return crypto_1.default.generateKeyPairSync('ec', {
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
_b = generateSignatureKeys(), exports.privateKeySign = _b.privateKey, exports.publicKeySign = _b.publicKey;
function generateSignature(message) {
    const sign = crypto_1.default.createSign('SHA256');
    sign.update(message);
    const signature = sign.sign(exports.privateKeySign, 'base64');
    return signature;
}
exports.generateSignature = generateSignature;
function verifySignature(message, signature) {
    const verify = crypto_1.default.createVerify('SHA256');
    verify.update(message);
    return verify.verify(exports.publicKeySign, signature, 'base64');
}
exports.verifySignature = verifySignature;
