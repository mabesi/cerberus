import axios from "axios";
import Config from "../configBase";
import { PoolData, TokenData } from "./uniswapTypes";
import { User } from "../models/user";
import { TransactionResponse, ethers } from "ethers";

import * as ABI_ERC20 from "./ERC20.json";
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

export async function preApprove(user: User, tokenToApprove: string, amountInEth: string) {

    if (!user.privateKey) throw new Error(`User doesn't has private key.`);

    const provider = new ethers.JsonRpcProvider(Config.RPC_NODE);
    const signer = new ethers.Wallet(user.privateKey, provider);
    const tokenContract = new ethers.Contract(tokenToApprove, ABI_ERC20, signer);
    const tx: TransactionResponse = await tokenContract.approve(Config.UNISWAP_ROUTER, ethers.parseEther(amountInEth));

    console.log(`Approve Tx: ` + tx.hash);
    console.log(`Approved amount: ` + amountInEth + ` (In wei: ${ethers.parseEther(amountInEth)})`);

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

export async function swap(user: User, automation: Automation, pool: Pool) : Promise<string> {
    
    //TODO: implementar o swap
    
    // return amountOut (in wei)
    return Promise.resolve("0");
}