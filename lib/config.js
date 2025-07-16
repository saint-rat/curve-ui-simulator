require("dotenv").config();
const { ethers } = require("hardhat");

const config = {
  // Single source of truth for your address
  walletAddress: process.env.YOUR_WALLET_ADDRESS,

  crvUsd: {
    tokenAddress: process.env.CRVUSD_TOKEN_ADDRESS,
    whaleAddress: process.env.CRVUSD_WHALE_ADDRESS,
  },
  crv: {
    tokenAddress: process.env.CRV_TOKEN_ADDRESS,
    whaleAddress: process.env.CRV_WHALE_ADDRESS,
  },
  feeDispatcher: {
    contractAddress: process.env.FEE_DISPATCHER_CONTRACT_ADDRESS,
    controllerAddresses: process.env.CONTROLLER_ADDRESSES.split(','),
  },
  feeDistributor: {
    contractAddress: process.env.FEE_DISTRIBUTOR_CONTRACT_ADDRESS,
  },
  rewardDistributor: {
    contractAddress: process.env.REWARD_DISTRIBUTOR_CONTRACT_ADDRESS,
  },
  scrvusdSimulationWeeks: {
    weeks: parseInt(process.env.SCRVUSD_SIMULATION_WEEKS || "1", 10),
  },
  vecrvSimulationWeeks: {
    weeks: parseInt(process.env.VECRV_SIMULATION_WEEKS || "1", 10),
  },
  feeDistributor: {
    contractAddress: process.env.FEE_DISTRIBUTOR_CONTRACT_ADDRESS,
    revenueAmount: process.env.VECRV_REVENUE_AMOUNT || "200000",
  },
  gasSettings: {
    maxFeePerGas: ethers.parseUnits(process.env.MAX_FEE_PER_GAS_GWEI, "gwei"),
    maxPriorityFeePerGas: ethers.parseUnits(process.env.MAX_PRIORITY_FEE_PER_GAS_GWEI, "gwei"),
    gasLimit: parseInt(process.env.GAS_LIMIT, 10),
  },
};

module.exports = config;