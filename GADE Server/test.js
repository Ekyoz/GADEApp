const express = require('express');
var bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('auth/key.pem'),
    cert: fs.readFileSync('auth/cert.pem')
};

const serverApp = express()

let port = 8080
let host = "192.168.1.28"

serverApp.use(bodyParser.urlencoded({ extended: false }));
serverApp.use(bodyParser.json())

serverApp.get('/', (req, res) => {
    res.status(200).send('ON');
    console.log("ON")
})

const server = https.createServer(options, serverApp);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
