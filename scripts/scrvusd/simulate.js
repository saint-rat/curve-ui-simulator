const config = require("../../lib/config");
const { advanceTime } = require("../advanceTime");
const { main: dispatchFees } = require("./dispatchFees");
const { main: processRewards } = require("./processRewards");

async function main() {
  const { weeks } = config.scrvusdSimulationWeeks;
  console.log(`--- Starting scrvUSD Rewards Simulation for ${weeks} Weeks(s) ---`);

  for (let i = 1; i <= weeks; i++) {
    console.log(`\n--- Week ${i} of ${weeks} ---`);
    await advanceTime(7);
    await dispatchFees();
    await processRewards();
    console.log(`--- Week ${i} Complete ---`);
  }

  console.log("\n--- Full Simulation Completed ---");
}

main().catch((error) => {
  console.error("Error during simulation:", error);
  process.exit(1);
});