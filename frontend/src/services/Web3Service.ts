import { JWT } from "commons/models/jwt";
import ConfigService from "./ConfigService";
import { BrowserProvider } from "ethers";
import { Status } from "commons/models/status";
import { Plan } from "commons/models/plan";
import { Contract } from "ethers";
import ERC20_ABI from "commons/services/ERC20.json";

function getProvider() {
    if (!window.ethereum) throw new Error(`No Metamask found!`);
    return new BrowserProvider(window.ethereum);
}

export async function getWallet(): Promise<string> {

    const provider = getProvider();
    const accounts = await provider.send("eth_requestAccounts", []);

    if (!accounts || !accounts.length) throw new Error(`MetaMask not allowed!`);

    const wallet = accounts[0];
    localStorage.setItem("wallet", wallet);

    return wallet;
}

export async function doLogin(): Promise<JWT | undefined> {

    const timestamp = Date.now();
    const message = ConfigService.getAuthMsg();
    const wallet = await getWallet();
    const provider  = getProvider();
    const signer = await provider.getSigner();
    const challenge = await signer.signMessage(message);
    
    console.log(challenge);

    //TODO: enviar timestamp, wallet e challenge para o backend

    return {
        address: "0x957339c0b3F129B5AF1DF15A2cAb1301f6799f93",
        name: "Mabesi",
        planId: "Gold",
        status: Status.ACTIVE,
        userId: "123456"
    } as JWT;
}

export async function startPayment(plan: Plan): Promise<boolean> {

    const provider = getProvider();
    const signer = await provider.getSigner();
    const tokenContract = new Contract(plan.tokenAddress, ERC20_ABI, signer);
    const tx = await tokenContract.approve(ConfigService.CERBERUS_PAY_CONTRACT, BigInt(plan.price) * 12n);
    
    await tx.wait();
    
    return true;
}