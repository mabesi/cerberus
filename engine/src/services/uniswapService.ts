import axios from "axios";
import CFG from "../config";
import { PoolData } from "./uniswapTypes";

export async function getTopPools(count: number = 100, skip: number = 0) : Promise<PoolData[]> {

    const query = `
        {
            pools(first: ${count}, skip: ${skip}, orderBy: volumeUSD, orderDirection: desc) {
                id,
                volumeUSD,
                feeTier,
                token0Price,
                token1Price,
                token0 {
                    symbol,
                    id,
                    decimals
                },
                token1 {
                    symbol,
                    id,
                    decimals
                }
            }
        }
    `;

    const { data } = await axios.post(CFG.UNISWAP_GRAPH_URL, { query });
   
    return data.data ? data.data.pools as PoolData[] :  [];
}
