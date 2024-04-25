"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const CryptService_1 = require("./CryptService");
const port = 8080;
const app = (0, express_1.default)();
const allowedOrigins = ['http://localhost:3006'];
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));
app.get('/rsa-keys', function (req, res, next) {
    const keys = { publicKey: CryptService_1.publicKey, privateKey: CryptService_1.privateKey };
    res.status(200).send(keys);
});
app.get('/signature-keys', function (req, res, next) {
    const keys = { publicKeySign: CryptService_1.publicKeySign, privateKeySign: CryptService_1.privateKeySign };
    res.status(200).send(keys);
});
app.post('/crypt/des', function (req, res, next) {
    var _a;
    console.log('aassd');
    const message = (_a = req.body) === null || _a === void 0 ? void 0 : _a.message;
    if (!message)
        res.status(404).send({ message: "No message" });
    const cryptMessage = (0, CryptService_1.encryptDES)(message);
    res.status(200).send({ cryptMessage });
});
app.post('/decrypt/des', function (req, res, next) {
    var _a;
    const message = (_a = req.body) === null || _a === void 0 ? void 0 : _a.message;
    if (!message)
        res.status(404).send({ message: "No message" });
    const decryptMessage = (0, CryptService_1.decryptDES)(message);
    res.status(200).send({ decryptMessage });
});
app.post('/crypt/rsa', function (req, res, next) {
    var _a;
    const message = (_a = req.body) === null || _a === void 0 ? void 0 : _a.message;
    if (!message)
        res.status(404).send({ message: "No message" });
    const cryptMessage = (0, CryptService_1.encryptRSA)(message);
    res.status(200).send({ cryptMessage });
});
app.post('/decrypt/rsa', function (req, res, next) {
    var _a;
    const message = (_a = req.body) === null || _a === void 0 ? void 0 : _a.message;
    if (!message)
        res.status(404).send({ message: "No message" });
    const decryptMessage = (0, CryptService_1.decryptRSA)(message);
    res.status(200).send({ decryptMessage });
});
app.post('/generate/signature', function (req, res, next) {
    var _a;
    const message = (_a = req.body) === null || _a === void 0 ? void 0 : _a.message;
    if (!message)
        res.status(404).send({ message: "No message" });
    const signature = (0, CryptService_1.generateSignature)(message);
    res.status(200).send({ signature });
});
app.post('/verify/signature', function (req, res, next) {
    var _a, _b;
    const message = (_a = req.body) === null || _a === void 0 ? void 0 : _a.message;
    const signature = (_b = req.body) === null || _b === void 0 ? void 0 : _b.signature;
    if (!message || !signature)
        res.status(404).send({ message: "No message or signature" });
    const isVerify = (0, CryptService_1.verifySignature)(message, signature);
    res.status(200).send({ isVerify });
});
app.listen(port, function () {
    console.log('Express server listening on port ' + port);
});
module.exports = app;
