import { ChainId } from "commons/models/chainId";
import { Exchange } from "commons/models/exchange";
import dotenv from "dotenv";

dotenv.config();

// Network
const NETWORK : string = `${process.env.NETWORK}`;

function getNetwork(network: string) : ChainId {
    switch (network) {
        case "goerli": return ChainId.GOERLI;
        default: return ChainId.MAINNET;
    }
}

const NETWORK2: ChainId = getNetwork(NETWORK);

// Exchange
const EXCHANGE : string = `${process.env.EXCHANGE}`;

function getExchange(exchange: string): Exchange {
    switch (exchange) {
        case "pancakeswap": return Exchange.PancakeSwap;
        default: return Exchange.Uniswap;
    }
}

const EXCHANGE2 : Exchange = getExchange(EXCHANGE);

// Mongo Database
const DATABASE_URL : string = `${process.env.DATABASE_URL}`;

// Uniswap GraphQL API
const UNISWAP_GRAPH_URL : string = `${process.env.UNISWAP_GRAPH_URL}`;

// Update Interval
const MONITOR_INTERVAL : number = parseInt(`${process.env.MONITOR_INTERVAL}`);
// Total Pool Count
const POOL_COUNT : number = parseInt(`${process.env.POOL_COUNT}`);

// WebSocket Server
const WS_PORT : number = parseInt(`${process.env.WS_PORT}`);

export default {
    NETWORK,
    NETWORK2,
    EXCHANGE,
    EXCHANGE2,
    DATABASE_URL,
    UNISWAP_GRAPH_URL,
    MONITOR_INTERVAL,
    POOL_COUNT,
    WS_PORT
}