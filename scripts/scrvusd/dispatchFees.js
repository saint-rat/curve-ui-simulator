const config = require("../../lib/config");
const { withImpersonatedSigner } = require("../../lib/impersonate");
const { getContract } = require("../../lib/utils");

async function main() {
  const { feeDispatcher, crvUsd, gasSettings } = config;

  await withImpersonatedSigner(crvUsd.whaleAddress, async (whaleSigner) => {
    const feeDispatcherContract = getContract(
      "FeeDispatcher",
      feeDispatcher.contractAddress,
      whaleSigner
    );

    await feeDispatcherContract.dispatch_fees(
      feeDispatcher.controllerAddresses,
      gasSettings
    );
    console.log("Fees dispatched successfully for controllers:", feeDispatcher.controllerAddresses);
  });
}

module.exports = { main };

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}