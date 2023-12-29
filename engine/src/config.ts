import ConfigBase from "commons/configBase";
import { ChainId } from "commons/models/chainId";
import { Exchange } from "commons/models/exchange";

export default class Config extends ConfigBase {

    // Network
    static NETWORK : string = `${process.env.NETWORK}`;
    static getNetwork(network: string) : ChainId {
        switch (network) {
            case "goerli": return ChainId.GOERLI;
            default: return ChainId.MAINNET;
        }
    }
    static NETWORK2: ChainId = Config.getNetwork(Config.NETWORK);

    // Exchange
    static EXCHANGE : string = `${process.env.EXCHANGE}`;
    static getExchange(exchange: string): Exchange {
        switch (exchange) {
            case "pancakeswap": return Exchange.PancakeSwap;
            default: return Exchange.Uniswap;
        }
    }
    static EXCHANGE2 : Exchange = Config.getExchange(Config.EXCHANGE);

    // Uniswap GraphQL API
    static UNISWAP_GRAPH_URL : string = `${process.env.UNISWAP_GRAPH_URL}`;
    // Update Interval
    static MONITOR_INTERVAL : number = parseInt(`${process.env.MONITOR_INTERVAL}`);
    // Payment Interval
    static CHARGE_INTERVAL : number = parseInt(`${process.env.CHARGE_INTERVAL}`);
    // Total Pool Count
    static POOL_COUNT : number = parseInt(`${process.env.POOL_COUNT}`);
    // WebSocket Server
    static WS_PORT : number = parseInt(`${process.env.WS_PORT}`);

}