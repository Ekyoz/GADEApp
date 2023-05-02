const WebSocketServer = require('ws').Server;
const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

const deviceTypeEnum = {
    LIGHT: 'light',
    CONTROL_PAN: 'control_panel',
    LUM_SENSOR: 'luminosity',
    PRE_SENSOR: 'presence',
    PC_SENSOR: 'power_consumption',
    ANDROID: 'android'
}

const httpsServer = https.createServer(options, (req, res) => {
    res.writeHead(404);
    res.end();
});

httpsServer.listen(8080, () => {
    console.log('Server is listening on port 8080');
});

const wss = new WebSocketServer({
    server: httpsServer
});

// Envoyer un message à un client WebSocket spécifique
function sendMessageToClient(clientId, message) {
    let clientFound = false;
    wss.clients.forEach((client) => {
        console.log(client.id);
        console.log(clientId.toString());
        if (client.id === clientId.toString()) {
            clientFound = true;
            client.send(message);
        }
    });
    if (!clientFound) {
        console.log(`Client ${clientId} not found`);
    }
}

function getUniqueID() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4();
};

function start() {
    wss.on('connection', (ws, req) => {
        ws.id = getUniqueID();

        console.log(`Client ${ws.id} connected`);

        ws.on('message', function incoming(message) {
            const data = JSON.parse(message);
            const deviceType = data.device_type;
            const deviceValue = data.values;

            switch (deviceType) {
                case deviceTypeEnum.LIGHT:
                    console.log(deviceValue.status + " " + deviceValue.brightness);
                    break;

                case deviceTypeEnum.LUM_SENSOR:
                    console.log(deviceValue.lumen);
                    break;

                case deviceTypeEnum.PRE_SENSOR:
                    console.log("presence test");
                    break;

                case deviceTypeEnum.PC_SENSOR:
                    console.log("power test");
                    break;

                case deviceTypeEnum.CONTROL_PAN:
                    console.log("control pan test");
                    break;

                case deviceTypeEnum.ANDROID:
                    console.log('andrid test');
                    break;

                default:
                    ws.send(JSON.stringify({
                        type: 'error',
                        message: 'Device type not found !'
                    }))
                    break;
            }
        });

        ws.on('close', () => {
            console.log(`Client ${ws.id} disconnected`);
        });
    });
}

start()

module.export = start