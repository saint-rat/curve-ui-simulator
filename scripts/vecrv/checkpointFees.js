const { ethers } = require("hardhat");
const config = require("../../lib/config");
const { getContract } = require("../../lib/utils");

async function main() {
  const { feeDistributor } = config;
  const [signer] = await ethers.getSigners();

  const feeDistributorContract = getContract(
    "FeeDistributor",
    feeDistributor.contractAddress,
    signer
  );

  await feeDistributorContract.checkpoint_total_supply();
  console.log("veCRV supply checkpoint successful.");

  await feeDistributorContract.checkpoint_token();
  console.log("veCRV Token revenue checkpoint successful.");
}

module.exports = { main };

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}