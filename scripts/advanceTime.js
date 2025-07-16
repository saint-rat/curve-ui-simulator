const { mine } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");

const ONE_DAY_IN_SECONDS = 24 * 60 * 60;
const BLOCK_INTERVAL_SECONDS = 12;

async function advanceTime(days) {
  const blocksToMine = (ONE_DAY_IN_SECONDS / BLOCK_INTERVAL_SECONDS) * days;

  const initialBlock = await ethers.provider.getBlock("latest");
  console.log(`Starting Block: ${initialBlock.number}, Timestamp: ${new Date(initialBlock.timestamp * 1000).toLocaleString()}. Advancing ${days} day(s) by mining ${blocksToMine} blocks...`);

  await mine(blocksToMine, { interval: BLOCK_INTERVAL_SECONDS });

  const finalBlock = await ethers.provider.getBlock("latest");
  console.log(`Time advancement complete. Current Block:   ${finalBlock.number}, Timestamp: ${new Date(finalBlock.timestamp * 1000).toLocaleString()}`);
}

async function main() {
  const daysToAdvance = parseInt(process.env.ADVANCE_DAYS || "1", 10);
  await advanceTime(daysToAdvance);
}

// Export the core function for other scripts to use
module.exports = { advanceTime };

// Only run main() if this script is executed directly
if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}