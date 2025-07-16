const { ethers } = require("hardhat");

async function sendEth(to, amountInEther = "100") {
  const [funder] = await ethers.getSigners();
  console.log(`Sending ${amountInEther} ETH to ${to}...`);
  await funder.sendTransaction({
    to,
    value: ethers.parseEther(amountInEther),
  });
  console.log("ETH sent successfully.");
}

function getContract(name, address, signer) {
  const abi = require(`../abis/${name}.json`);
  return new ethers.Contract(address, abi, signer);
}

module.exports = { sendEth, getContract };