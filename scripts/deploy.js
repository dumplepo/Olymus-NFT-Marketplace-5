const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const NFTMarketplace = await hre.ethers.getContractFactory("MythicNFTMarketplace");

  // Deploy the contract and wait for deployment
  const marketplace = await NFTMarketplace.deploy();

  // No need to call marketplace.deployed() in Ethers v6
  await marketplace.waitForDeployment();

  console.log("Marketplace deployed to:", marketplace.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
