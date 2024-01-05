import CFG from "./config";
import { getTopPools } from "commons/services/uniswapService";
import poolsRepository from "./repositories/poolsRepository";
import WSSInit from "./wss";
import cerberusExecution from "./cerberus";

const WSS = WSSInit();

async function executionCycle() {
    
    console.log(new Date() + ' - Updating monitor');

    const pages = Math.ceil(CFG.POOL_COUNT / 1000);

    for (let i=0; i < pages; i++ ) {
        
        const pools = await getTopPools(1000, i * 1000);
        console.log(`Loaded ${pools.length} pools`);

        const bulkResult = [];
        for (let j=0; j < pools.length; j++) {
            
            const pool = pools[j];
            
            const poolResult = await poolsRepository.updatePrices(pool);
            if (!poolResult) continue;

            bulkResult.push(poolResult);

            cerberusExecution(poolResult);
            
            // console.log(`Price for ${poolResult.symbol} (${poolResult.fee / 10000}%) is ${Number(poolResult.price0).toFixed(6)}`);
        }

        WSS.broadcast({event: "priceUpdate", data: bulkResult});
    }

    console.log(`----- Pausing update for ${CFG.MONITOR_INTERVAL / 60000} minutes -----`);
}

export default () => {
    setInterval(executionCycle, CFG.MONITOR_INTERVAL);
    console.log(`Cerberus Monitor started`);
    executionCycle();
}
