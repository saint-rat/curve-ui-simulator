const config = require("../../lib/config");
const { advanceTime } = require("../advanceTime");
const { main: sendRevenue } = require("./sendRevenue");
const { main: checkpointFees } = require("./checkpointFees");

async function main() {
  const { weeks } = config.vecrvSimulationWeeks;
  console.log(`--- Starting veCRV Rewards Simulation for ${weeks} Week(s) ---`);

  for (let i = 1; i <= weeks; i++) {
    console.log(`\n--- Week ${i} of ${weeks} ---`);
    await advanceTime(7);
    await sendRevenue();
    await checkpointFees();
    console.log(`--- Week ${i} Complete ---`);
  }

  console.log("\n--- Full veCRV Simulation Completed ---");
}

main().catch((error) => {
  console.error("Error during simulation:", error);
  process.exit(1);
});