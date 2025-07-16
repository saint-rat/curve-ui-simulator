const config = require("../../lib/config");
const { withImpersonatedSigner } = require("../../lib/impersonate");
const { getContract } = require("../../lib/utils");

async function main() {
  const { rewardDistributor, crvUsd, gasSettings } = config;
  const takeSnapshot = true;

  await withImpersonatedSigner(crvUsd.whaleAddress, async (whaleSigner) => {
    const rewardDistributorContract = getContract(
      "RewardDistributor",
      rewardDistributor.contractAddress,
      whaleSigner
    );

    await rewardDistributorContract.process_rewards(takeSnapshot, gasSettings);
    console.log("scrvUSD rewards processed successfully.");
  });
}

module.exports = { main };

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}