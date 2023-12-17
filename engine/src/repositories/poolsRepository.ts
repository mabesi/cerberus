import { ChainId } from "commons/models/chainId";
import connect from "./db";
import Pool from "commons/models/pool";
import { Exchange } from "commons/models/exchange";


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

export default {
    getPool,
    addPool,
    countPools
}