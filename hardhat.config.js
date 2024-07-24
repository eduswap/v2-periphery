require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [{
      version: "0.8.24",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        }
      },
    }],
  },
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      forking: {
        url: "https://rpc.open-campus-codex.gelato.digital",
      }
    },
    edutest: {
      url: "https://rpc.open-campus-codex.gelato.digital",
    },
  }
};