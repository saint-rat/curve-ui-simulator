const { ethers } = require("hardhat");
const config = require("../lib/config");
const { withImpersonatedSigner } = require("../lib/impersonate");
const { sendEth, getContract } = require("../lib/utils");

async function main() {
  // Use address from command line, or default to config.walletAddress
  const toAddress = process.argv[2] || config.walletAddress;
  // Use amount from command line, or default to 100,000
  const amount = process.argv[3] || "100000";

  if (!ethers.isAddress(toAddress)) {
    console.error(`Invalid address provided: ${toAddress}`);
    process.exit(1);
  }

  const amountToTransfer = ethers.parseUnits(amount, 18);

  await withImpersonatedSigner(config.crvUsd.whaleAddress, async (whaleSigner) => {
    // Fund the whale with gas money
    await sendEth(whaleSigner.address, "10");

    const crvUsdContract = getContract("ERC20", config.crvUsd.tokenAddress, whaleSigner);

    console.log(`Transferring ${ethers.formatUnits(amountToTransfer, 18)} crvUSD to ${toAddress}...`);
    await crvUsdContract.transfer(toAddress, amountToTransfer, config.gasSettings);
    console.log("crvUSD transferred successfully.");
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});