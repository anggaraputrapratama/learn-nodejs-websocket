const WebSocket = require('ws')
const port = 8080
const wss = new WebSocket.Server({port:port})
console.log(`[WebSocket] Starting WebSocket server on localhost:${port}`);

wss.on("connection", (ws, request)=>{
    const clientIp = request.connection.remoteAddress;
    console.log(`[WebSocket] Client with IP ${clientIp} has connected`);
    ws.send("Thank for connection to this nodejs websocket server");

    //broadcast akan send message to all connected clients
    ws.on("message", (message)=>{
        wss.clients.forEach((client)=>{
            if (client.readyState == WebSocket.OPEN) {
                ws.send('Message received, message sent back from server: '+message)
            }
        });
        console.log(`[WebSocket] Message ${message} was received`); 
    }); 
});

