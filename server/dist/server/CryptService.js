"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoService = void 0;
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
class CryptoService {
    encryptDES(message) {
        const key = Buffer.from('12345678', 'utf8');
        const cipher = crypto_1.default.createCipheriv('des-ecb', key, null);
        let encrypted = cipher.update(message, 'utf8', 'base64');
        encrypted += cipher.final('base64');
        return encrypted;
    }
    decryptDES(encryptedMessage) {
        const key = Buffer.from('12345678', 'utf8');
        const decipher = crypto_1.default.createDecipheriv('des-ecb', key, null);
        let decrypted = decipher.update(encryptedMessage, 'base64', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
    generateSignature(message) {
        const privateKey = fs_1.default.readFileSync('keys/dsa_private_key.pem', 'utf8');
        const sign = crypto_1.default.createSign('DSA');
        sign.update(message);
        return sign.sign(privateKey, 'base64');
    }
    verifySignature(message, signature) {
        const publicKey = fs_1.default.readFileSync('keys/dsa_public_key.pem', 'utf8');
        const verify = crypto_1.default.createVerify('DSA');
        verify.update(message);
        return verify.verify(publicKey, signature, 'base64');
    }
}
exports.CryptoService = CryptoService;
