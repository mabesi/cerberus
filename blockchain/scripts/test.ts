import { ethers } from "hardhat";
import { CerberusPay } from "../typechain-types";

const ABI_WETH = require("./abi.weth.json");
const WETH_MAINNET = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
const WALLET = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const PRIVATE_KEY = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

const provider = new ethers.JsonRpcProvider("http://localhost:8545");
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const wethContract = new ethers.Contract(WETH_MAINNET, ABI_WETH, signer);

async function depositEth(){
    
    const tx = await wethContract.deposit({ value: ethers.parseEther("10") });
    await tx.wait();

    console.log("Tx Deposit: " + tx.hash);

    const balance = await wethContract.balanceOf(WALLET);
    console.log("Weth Balance: " + ethers.formatEther(balance));
}

async function payFirstMonth(cerberusPay: CerberusPay) {
    await wethContract.approve(cerberusPay.target, ethers.parseEther("1"));
    await cerberusPay.pay(WALLET);
    console.log(`Account 0 payed!`);
}

async function main() {
    const cerberusPay = await ethers.deployContract("CerberusPay");
    await cerberusPay.waitForDeployment();
    await cerberusPay.setAcceptedToken(WETH_MAINNET);
    console.log(`Deployed to ${cerberusPay.target}`);

    await depositEth();

    await payFirstMonth(cerberusPay);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});