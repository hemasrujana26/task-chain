const { ethers } = require("ethers");
const axios = require("axios");
const fs = require("fs");
const config = require("./config");

const taskBoardAbi = require("../deployments/sepolia/TaskBoard.json").abi;
const taskTokenAbi = require("../deployments/sepolia/TaskToken.json").abi;

const provider = new ethers.providers.JsonRpcProvider(config.RPC_URL);
const wallet = new ethers.Wallet(config.PRIVATE_KEY, provider);
const taskBoard = new ethers.Contract(config.TASKBOARD_ADDRESS, taskBoardAbi, wallet);
const taskToken = new ethers.Contract(config.TASKTOKEN_ADDRESS, taskTokenAbi, wallet);

async function fetchEthUsd() {
  const res = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd");
  return Math.round(res.data.ethereum.usd * 1e8); // 8 decimals
}

async function main() {
  console.log("Agent started");
  let lastTaskId = 0;
  while (true) {
    const count = await taskBoard.taskCount();
    for (let i = lastTaskId; i < count; i++) {
      const task = await taskBoard.tasks(i);
      if (task.status === 0) { // Pending
        console.log(`New task ${i}, fetching price...`);
        const price = await fetchEthUsd();
        const tx1 = await taskBoard.submitResult(i, price);
        await tx1.wait();
        console.log(`Submitted result for task ${i}: ${price}`);
        const tx2 = await taskBoard.verifyAndPay(i);
        await tx2.wait();
        console.log(`Verified and paid for task ${i}`);
      }
    }
    lastTaskId = count;
    await new Promise(r => setTimeout(r, 15000));
  }
}

main().catch(console.error); 