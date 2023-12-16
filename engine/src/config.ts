import dotenv from "dotenv";

dotenv.config();

const NETWORK : string = `${process.env.NETWORK}`;
const EXCHANGE : string = `${process.env.EXCHANGE}`;
const DATABASE_URL : string = `${process.env.DATABASE_URL}`;
const UNISWAP_GRAPH_URL : string = `${process.env.UNISWAP_GRAPH_URL}`;
const MONITOR_INTERVAL : number = parseInt(`${process.env.MONITOR_INTERVAL}`);
const POOL_COUNT : number = parseInt(`${process.env.POOL_COUNT}`);

export default {
    NETWORK,
    EXCHANGE,
    DATABASE_URL,
    UNISWAP_GRAPH_URL,
    MONITOR_INTERVAL,
    POOL_COUNT
}