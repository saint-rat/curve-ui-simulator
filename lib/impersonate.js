const { ethers, network } = require("hardhat");

async function withImpersonatedSigner(address, action) {
  await network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [address],
  });
  const signer = await ethers.getSigner(address);

  try {
    await action(signer);
  } finally {
    await network.provider.request({
      method: "hardhat_stopImpersonatingAccount",
      params: [address],
    });
  }
}

module.exports = { withImpersonatedSigner };