const WebSocket = require('ws');
const prompt = require('prompt-sync')({ sigint: true });

const wsClient = new WebSocket("ws://localhost:5000");

wsClient.on("message", (msg) => {
    console.log('messaggio: '+ msg);
    let messaggio = prompt('Invia un messaggio: ');
    wsClient.send(messaggio);
});