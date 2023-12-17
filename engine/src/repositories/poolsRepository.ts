import CFG from "../config";
import connect from "./db";
import Pool from "commons/models/pool";
import { ChainId } from "commons/models/chainId";
import { Exchange } from "commons/models/exchange";
import { PoolData } from "../services/uniswapTypes";


async function countPools(exchange: Exchange, network: ChainId): Promise<number> {

    const db = await connect();
    const count = await db.pools.count({
        where: { exchange, network }
    });

    return count;
}

async function getPool(id: string): Promise<Pool | null> {

    const db = await connect();
    const pool = await db.pools.findUnique({
        where: {id}
    });

    return pool;
}

async function addPool(pool: Pool): Promise<Pool> {

    if (!pool.id) throw new Error(`Invalid pool!`);
    const db = await connect();
    const newPool = await db.pools.create({
        data: pool
    });

    return newPool;
}

async function updatePrices(poolData: PoolData) : Promise<Pool | null> {

    const newPrice0 = Number(poolData.token0Price);
    const newPrice1 = Number(poolData.token1Price);

    const db = await connect();
    let pool = await getPool(poolData.id);
    if (!pool) {
        pool = new Pool({
            exchange: CFG.EXCHANGE2,
            network: CFG.NETWORK2,
            id: poolData.id,
            fee: Number(poolData.feeTier),
            token0: poolData.token0.id,
            token1: poolData.token1.id,
            symbol: poolData.token0.symbol + poolData.token1.symbol,
            symbol0: poolData.token0.symbol,
            symbol1: poolData.token1.symbol,
        } as Pool);
        pool = await addPool(pool);
    }

    //TODO: Processamentos adicionais

    await db.pools.update({
        where: { id: poolData.id },
        data: {
            price0: poolData.token0Price,
            price1: poolData.token1Price,
            lastUpdate: new Date()
        }
    });

    return getPool(poolData.id);
}

export default {
    getPool,
    addPool,
    countPools,
    updatePrices
}