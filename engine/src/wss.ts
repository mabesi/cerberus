import WebSocket, { WebSocketServer } from "ws";

let wss;

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