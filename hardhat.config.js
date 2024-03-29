require('@nomicfoundation/hardhat-toolbox');
require('dotenv/config');

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
    oneness_dev: {
      url: process.env.NETWORK_ONENESS_DEV,
      accounts: accounts(),
    },
    arb_g: {
      url: process.env.NETWORK_ARB_G,
      accounts: accounts(),
    },
  },

  solidity: {
    version: '0.8.19',
    settings: {
      optimizer: {
        enabled: true,
        runs: 100,
      },
      viaIR: true,
    },
  },
};
