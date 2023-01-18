const WebSocket = require('ws');

const wsServer = new WebSocket.Server({
    port: 5000,
});
console.log("Il Server è attivo " + wsServer.options.port );

var operation = "radd";

wsServer.on("connection" , (socket) => {
    console.log("client si è connesso, i dati del client sono: " + socket);
    socket.on("message" , (msg) => {
        msg = ''+msg;
        console.log("ho ricevuto un messaggio: " + msg);
        if (isNaN(msg*1)) {
            let upd = "";
            switch (msg) {
                case "multiplica":
                    operation = "mult";
                    break;
                case "raddoppia":
                    operation = "radd";
                    break;
                case "fattoriale":
                    operation = "fatt";
                    break;
                default:
                    upd += "Operazione non valida";
                    break;
            }
            socket.send(upd+ "messaggio ricevuto");
        } else {
            socket.send(ciao(msg));
        }
    });
});

function ciao(stringa) {
    var oper = operation;
    let numero = parseInt(stringa);
    switch (oper) {
        case "mult":
            return numero*numero;
        case "radd":
            return numero*2;
        case "fatt":
            return calcolofattoriale(numero);
        default:
            break;
    }
}

function calcolofattoriale( num ){
    var fatt = 1;
    for(let i = 1; i <= num; i++)
    {
        fatt = fatt * i;
    }
    return fatt;
}