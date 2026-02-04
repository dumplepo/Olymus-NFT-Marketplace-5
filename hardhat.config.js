require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat", // Local Hardhat network by default
  networks: {
    hardhat: {
      chainId: 31337, // Local chain ID
    },
    localhost: {
      url: "http://127.0.0.1:8545", // Local Hardhat node
      chainId: 31337,
    },
  },
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./contracts", // Solidity contracts
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};
