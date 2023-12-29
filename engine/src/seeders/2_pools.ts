import ISeeder from "./ISeeder";
import poolsRepository from "../repositories/poolsRepository";
import CFG from "../config"
import { PoolData } from "../../services/uniswapTypes";
import { getTopPools } from "../../services/uniswapService";
import Pool from "commons/models/pool";

export class PoolsSeeder implements ISeeder {
    
    async execute() : Promise<void> {

        console.log(`Initializing pools seeder...`);
        
        console.log(`Checking if the pools already exists...`);
        const count = await poolsRepository.countPools(CFG.EXCHANGE2, CFG.NETWORK2);
        if (count > 0) {
            console.log(`The pools already exists...`);
            return;            
        }

        let skip : number = 0;
        let pools : PoolData[] = [];

        do {

            pools = await getTopPools(1000, skip);
            console.log(`Loaded ${pools.length} pools...`);
            
            for (let i=0; i < pools.length; i++) {
                const pool = pools[i];
                console.log(pool.id);
                await poolsRepository.addPool(new Pool({
                    id: pool.id,
                    exchange: CFG.EXCHANGE2,
                    network: CFG.NETWORK2,
                    fee: Number(pool.feeTier),
                    symbol: pool.token0.symbol + pool.token1.symbol,
                    symbol0: pool.token0.symbol,
                    symbol1: pool.token1.symbol,
                    token0: pool.token0.id,
                    token1: pool.token1.id,
                    price0: parseFloat(pool.token0Price),
                    price1: parseFloat(pool.token1Price)
                } as Pool));
            }

            skip += pools.length;
            console.log(`Inserted ${pools.length} pools...`);

        } while(pools.length > 0)

        console.log(`Finalized pools seeder!`);

    }

}

export default new PoolsSeeder();