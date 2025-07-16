require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      forking: {
        url: process.env.MAINNET_RPC_URL,
        blockNumber: parseInt(process.env.BLOCK_NUMBER, 10),
      },
      chainId: 31337,
      mining: {
        auto: false,
        interval: 12000,
        mempool: {
          order: "fifo",
        },
      },
    },
  },
};
