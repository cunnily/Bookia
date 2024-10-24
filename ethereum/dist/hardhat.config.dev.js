"use strict";

require("@nomicfoundation/hardhat-toolbox");

var INFURA_API_KEY = "4c3f30bf61654b41ad626a44f98adb49";
var SEPOLIA_PRIVATE_KEY = "84bf4b7e89b0406a6e472cfaa9643908e204e9811c4a8ea0d91afc3c1e04226c";
var ETHERSCAN_API_KEY = "WQ8GYBYVHI8JQ726556YQ6YN99BGE6G9CY";
/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/".concat(INFURA_API_KEY),
      accounts: [SEPOLIA_PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY
    }
  },
  solidity: "0.8.27"
};