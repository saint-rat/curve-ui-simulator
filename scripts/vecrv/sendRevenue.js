const { ethers } = require("hardhat");
const config = require("../../lib/config");
const { withImpersonatedSigner } = require("../../lib/impersonate");
const { sendEth, getContract } = require("../../lib/utils");

async function main() {
  const { crvUsd, feeDistributor, gasSettings } = config;

  await withImpersonatedSigner(crvUsd.whaleAddress, async (whaleSigner) => {
    // Fund the whale with gas money first
    await sendEth(whaleSigner.address, "10");

    const crvUsdContract = getContract("ERC20", crvUsd.tokenAddress, whaleSigner);
    const amountToTransfer = ethers.parseUnits(feeDistributor.revenueAmount, 18);

    await crvUsdContract.transfer(feeDistributor.contractAddress, amountToTransfer, gasSettings);
    console.log(`Sent ${ethers.formatUnits(amountToTransfer, 18)} crvUSD to Fee Distributor.`);
  });
}

module.exports = { main };

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}