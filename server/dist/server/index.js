"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CryptService_1 = require("./CryptService");
const port = 8080;
const app = (0, express_1.default)();
const cs = new CryptService_1.CryptoService();
console.log(cs.encryptDES('message'));
app.get('/', function (req, res, next) {
});
app.listen(port, function () {
    console.log('Express server listening on port ' + port);
});
module.exports = app;
