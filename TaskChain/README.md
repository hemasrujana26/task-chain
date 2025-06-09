# TaskChain

A decentralized, trustless on-chain task board for ETH/USD price fetching, using Solidity, Chainlink, a Node.js agent, and a vibrant React + Tailwind frontend.

## Features
- Post tasks to fetch ETH/USD price
- Agent fetches price from CoinGecko and submits on-chain
- Smart contract verifies with Chainlink and pays in $TASK tokens
- Frontend for wallet, tasks, balances, and agent logs

## Project Structure
- `contracts/` — Solidity smart contracts
- `agents/` — Node.js agent
- `frontend/` — React + Tailwind UI
- `deployments/` — Deployment artifacts

## Setup
1. Install dependencies in each folder (`npm install`)
2. Configure `.env` with your PRIVATE_KEY, RPC_URL, and CHAIN_ID
3. Deploy contracts with Hardhat
4. Run the agent
5. Start the frontend

See each folder for more details. 