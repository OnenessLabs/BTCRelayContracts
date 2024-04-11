require('@nomicfoundation/hardhat-toolbox');
require('dotenv/config');
require("@nomicfoundation/hardhat-verify");


task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

function accounts() {
  privatekey = process.env.PrivateKey;
  if (!privatekey)
    return {
      mnemonic: 'test test test test test test test test test test test junk',
    };
  return [privatekey];
}

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    onedev: {
      url: process.env.NETWORK_ONENESS_DEV,
      accounts: accounts(),
    },
    arb_g: {
      url: process.env.NETWORK_ARB_G,
      accounts: accounts(),
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
    customChains: [
      {
        network: 'onedev',
        chainId: 123666,
        urls: {
          apiURL: 'https://scan.devnet.onenesslabs.io/api',
          browserURL: 'https://scan.devnet.onenesslabs.io/',
        },
      },
    ]},
  solidity: {
    compilers:[
   { 
    version: '0.8.19',
    settings: {
      optimizer: {
        enabled: true,
        runs: 100,
      },
      viaIR: true,
    }},
  // { 
  //   version: '0.7.6',
  //   settings: {
  //     optimizer: {
  //       enabled: true,
  //       runs: 2000,
  //       details: {
  //         yul: true,
  //         yulDetails: {
  //           stackAllocation: true,
  //           optimizerSteps: "dhfoDgvulfnTUtnIf"
  //         }
  //       }
  //     },
  //     viaIR: true,
  //   }}
  ]
  },
};
