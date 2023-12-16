import CFG from "./config";
import { Token } from "commons/models/token";
import { getTopPools } from "./services/uniswapService";

console.log("Inicializando CERBERUS Monitor");
console.log("Obtendo Uniswap Pools");

getTopPools()
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.error(err);
    })