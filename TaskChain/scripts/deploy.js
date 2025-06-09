const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with:", deployer.address);

  // Deploy TaskToken
  const TaskToken = await hre.ethers.getContractFactory("TaskToken");
  const taskToken = await TaskToken.deploy();
  await taskToken.deployed();
  console.log("TaskToken deployed to:", taskToken.address);

  // Chainlink ETH/USD Sepolia feed
  const CHAINLINK_FEED = "0x694AA1769357215DE4FAC081bf1f309aDC325306";

  // Deploy TaskBoard
  const TaskBoard = await hre.ethers.getContractFactory("TaskBoard");
  const taskBoard = await TaskBoard.deploy(taskToken.address, CHAINLINK_FEED);
  await taskBoard.deployed();
  console.log("TaskBoard deployed to:", taskBoard.address);

  // Save deployments
  const deploymentsDir = path.join(__dirname, "../deployments/sepolia");
  if (!fs.existsSync(deploymentsDir)) fs.mkdirSync(deploymentsDir, { recursive: true });
  fs.writeFileSync(
    path.join(deploymentsDir, "TaskToken.json"),
    JSON.stringify({ address: taskToken.address, abi: JSON.parse(taskToken.interface.format("json")) }, null, 2)
  );
  fs.writeFileSync(
    path.join(deploymentsDir, "TaskBoard.json"),
    JSON.stringify({ address: taskBoard.address, abi: JSON.parse(taskBoard.interface.format("json")) }, null, 2)
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 