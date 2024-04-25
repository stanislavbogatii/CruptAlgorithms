import express from 'express';
import cors from 'cors';
import { decryptDES, decryptRSA, encryptDES, encryptRSA, generateSignature, privateKey, privateKeySign, publicKey, publicKeySign, verifySignature } from './CryptService';
const port = 8080;

const app = express();
const allowedOrigins = ['http://localhost:3006'];
app.use(express.json());


app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  }));

app.get('/rsa-keys', function(req, res, next) {
    const keys = {publicKey, privateKey};
    res.status(200).send(keys);
});

app.get('/signature-keys', function(req, res, next) {
    const keys = {publicKeySign, privateKeySign};
    res.status(200).send(keys);
})

app.post('/crypt/des', function(req, res, next) {
    const message = req.body?.message;
    if (!message) res.status(404).send({message: "No message"});
    const cryptMessage = encryptDES(message);
    res.status(200).send({cryptMessage});
});

app.post('/decrypt/des', function(req, res, next) {
    const message = req.body?.message;
    if (!message) res.status(404).send({message: "No message"});
    const decryptMessage = decryptDES(message);
    res.status(200).send({decryptMessage});
})

app.post('/crypt/rsa', function(req, res, next) {
    const message = req.body?.message;
    if (!message) res.status(404).send({message: "No message"});
    const cryptMessage = encryptRSA(message);
    res.status(200).send({cryptMessage});
});

app.post('/decrypt/rsa', function(req, res, next) {
    const message = req.body?.message;
    if (!message) res.status(404).send({message: "No message"});
    const decryptMessage = decryptRSA(message);
    res.status(200).send({decryptMessage});
});

app.post('/generate/signature', function(req, res, next) {
    const message = req.body?.message;
    if (!message) res.status(404).send({message: "No message"});
    const signature = generateSignature(message);
    res.status(200).send({signature});
})

app.post('/verify/signature', function(req, res, next) {
    const message = req.body?.message;
    const signature = req.body?.signature;
    if (!message || !signature) res.status(404).send({message: "No message or signature"});
    const isVerify = verifySignature(message, signature);
    res.status(200).send({isVerify});
});

app.listen(port, function() {
    console.log('Express server listening on port ' + port);
});

module.exports = app;