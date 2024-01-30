import axios from "axios";
import Config from "../configBase";
import { PoolData, SwapData, TokenData } from "./uniswapTypes";
import { User } from "../models/user";
import { TransactionReceipt, TransactionResponse, ethers } from "ethers";

// import * as ABI_UNISWAP_ROUTER from "./Uniswap.json";
// import * as ABI_ERC20 from "./ERC20.json";
const ABI_UNISWAP_ROUTER = require("./Uniswap.json");
const ABI_ERC20 = require("./ERC20.json");

import Automation from "../models/automation";
import Pool from "../models/pool";

export async function getTokens(skip: number) : Promise<TokenData[]> {

    const query = `
        {
            tokens(first: 1000, skip: ${skip})
            {
                symbol,
                id,
                decimals,
                name            
            }
        }
    `;

    const { data } = await axios.post(Config.UNISWAP_GRAPH_URL, { query });
   
    return data.data ? data.data.tokens as TokenData[] :  [];
}

export async function getTopPools(count: number = 100, skip: number = 0) : Promise<PoolData[]> {

    const query = `
        {
            pools(first: ${count}, skip: ${skip}, orderBy: volumeUSD, orderDirection: desc)
            {
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

    const { data } = await axios.post(Config.UNISWAP_GRAPH_URL, { query });
   
    return data.data ? data.data.pools as PoolData[] :  [];
}

export async function preApprove(user: User, tokenToApprove: string, amountInWei: string) {

    if (!user.privateKey) throw new Error(`User doesn't has private key.`);

    const provider = new ethers.JsonRpcProvider(Config.RPC_NODE);
    const signer = new ethers.Wallet(user.privateKey, provider);
    const tokenContract = new ethers.Contract(tokenToApprove, ABI_ERC20, signer);
    const tx: TransactionResponse = await tokenContract.approve(Config.UNISWAP_ROUTER, amountInWei);

    console.log(`Approve Tx: ` + tx.hash);
    console.log(`Approved amount in wei: ${amountInWei})`);

    await tx.wait()
}

export async function approve(tokenContract: ethers.Contract, amountInWei: string | bigint) {

    const tx: TransactionResponse = await tokenContract.approve(Config.UNISWAP_ROUTER, amountInWei);

    console.log(`Approve Tx: ` + tx.hash);
    console.log(`Approved amount (wei): ` + amountInWei);

    await tx.wait()
}

export async function getAllowance(tokenAddress: string, wallet: string) : Promise<bigint> {
    
    const provider = new ethers.JsonRpcProvider(Config.RPC_NODE);
    const tokenContract = new ethers.Contract(tokenAddress, ABI_ERC20, provider);
    return tokenContract.allowance(wallet, Config.UNISWAP_ROUTER);
}

export async function swap(user: User, automation: Automation, pool: Pool) : Promise<SwapData | null> {
    
    if (!user.privateKey) return null;
    
    const provider = new ethers.JsonRpcProvider(Config.RPC_NODE);
    const signer = new ethers.Wallet(user.privateKey, provider);
    
    const routerContract = new ethers.Contract(Config.UNISWAP_ROUTER, ABI_UNISWAP_ROUTER, signer);
    const token0Contract = new ethers.Contract(pool.token0, ABI_ERC20, signer);
    const token1Contract = new ethers.Contract(pool.token1, ABI_ERC20, signer);
    
    const condition = automation.isOpened ? automation.closeCondition : automation.openCondition;
    if (!condition) return null;
    
    const isPrice0Condition = condition.field.indexOf("price0") !== -1;
    
    const [tokenIn, tokenOut] = isPrice0Condition
        ? [token1Contract, token0Contract]
        : [token0Contract, token1Contract];
        
    const amountIn = BigInt(automation.nextAmount);

    const allowance = await getAllowance(tokenIn.target.toString(), user.address);
    if (allowance < amountIn)
        await approve(tokenIn, amountIn);
    
    const swapParams = {
        tokenIn,
        tokenOut,
        fee: pool.fee,
        recipient: user.address,
        deadline: (Date.now() / 1000) + 10,
        amountIn,
        amountOutMinimum: 0,
        sqrtPriceLimitX96: 0
    }

    console.log(swapParams);

    const tx: TransactionResponse = await routerContract.exactInputSingle(
        swapParams,
        {
            from: user.address,
            gasPrice: ethers.parseUnits("35", "gwei"),
            gasLimit: 350000
        }
    );

    console.log(`Swap Tx Id: ` + tx.hash);

    let amountOutWei: bigint = 0n;

    try {

        const receipt: TransactionReceipt | null = await tx.wait();
        if (!receipt) throw new Error(`Swap Error. Tx Id: ${tx.hash}`);

        amountOutWei = ethers.toBigInt(receipt.logs[0].data);
        if (!amountOutWei) throw new Error(`Swap Error. Tx Id: ${tx.hash}`);
    
    } catch (err: any) {
    
        console.log(err);
        throw new Error(`Swap Error. Tx Id: ${tx.hash}`);
    }

    console.log(`Swap Success. Tx Id: ${tx.hash}. Amount Out: ${amountOutWei}`);

    return {
        tokenIn: tokenIn.target.toString(),
        tokenOut: tokenOut.target.toString(),
        amountIn: amountIn.toString(),
        amountOut: amountOutWei.toString(),
        price: isPrice0Condition ? pool.price0 : pool.price1
    } as SwapData;
}