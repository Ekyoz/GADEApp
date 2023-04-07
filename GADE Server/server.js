const express = require('express');
var bodyParser = require('body-parser');
const http = require('http')

const serverApp = express()

let port = 8080
let host = "192.168.1.28"

serverApp.use(bodyParser.urlencoded({ extended: false }));
serverApp.use(bodyParser.json())

serverApp.get('/', (req, res) => {
    res.status(200).send('ON');
    console.log("ON")
})

serverApp.set('port', 8080);
const server = http.createServer(serverApp);

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`)
})