import CFG from "./config";
import WebSocket, { WebSocketServer } from "ws";
import { IncomingMessage } from "http";

let wss: CerberusWSS;

class CerberusWS extends WebSocket {

    id: string;

    constructor(address: string) {
        super(address);
        this.id = "";
    }
}

class CerberusWSS extends WebSocketServer {

    isConnected(userId: string) : boolean {
        
        if (!this.clients || !this.clients.size) return false;
        return ([...this.clients] as CerberusWS[]).some(c => c.id === userId);
    }
    
    getConnections() : string[] {
        
        if (!this.clients || !this.clients.size) return [];
        return ([...this.clients] as CerberusWS[]).map(c => c.id);
    }
    
    direct(userId: string, jsonObj: Object) {
        
        if (!this.clients || !this.clients.size) return;
        
        ([...this.clients] as CerberusWS[]).forEach(client => {
            if (client.id === userId && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(jsonObj))
                return;
            }    
        })
    }

    broadcast(jsonObj: Object) {
        
        if (!this.clients || !this.clients.size) return;
        
        ([...this.clients] as CerberusWS[]).forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(jsonObj))
                return;
            }    
        })
    }
}

function verifyClient(info: any, callback: Function) {
    return callback(true);
}

export default () : CerberusWSS => {
    
    if (wss) return wss;

    wss = new CerberusWSS({
        port: CFG.WS_PORT,
        verifyClient
    });

    wss.on("connection", (ws: CerberusWS, req: IncomingMessage) => {
        
        if (!req.url) return;
        
        //TODO: implementar segurança!!!
        ws.id = req.url;
        
        ws.on("message", (data) => console.log(data));
        ws.on("error", (err) => console.error(err));
        console.log("ws.onConnection: " + req.url);
    })

    console.log(`Cerberus WebSocket Server is running on port ${CFG.WS_PORT}`);

    return wss;
}