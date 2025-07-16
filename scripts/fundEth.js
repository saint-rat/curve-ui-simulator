const config = require("../lib/config");
const { sendEth } = require("../lib/utils");
const { ethers } = require("hardhat");

async function main() {
  // Use address from command line, or default to the one in your .env
  const toAddress = process.argv[2] || config.walletAddress;

  // Use amount from command line, or default to "100"
  const amount = process.argv[3] || "100";

  if (!ethers.isAddress(toAddress)) {
    console.error(`Invalid address provided: ${toAddress}`);
    process.exit(1);
  }

  await sendEth(toAddress, amount);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});