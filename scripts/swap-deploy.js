// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require('hardhat');

const relayAddress = {
  onedev: '0x86cc2A8674926b3Ea967080350073C179652032C',
  one: '',
}[hre.network.name];

async function main() {
  const swap = await hre.ethers.deployContract(
    'contracts/SwapContract-dynamic-security-deposit.sol:CrossLightningSwaps',
    [relayAddress],
    {
      value: 0,
    }
  );

  await swap.waitForDeployment();

  console.log(`deploy swap to ${swap.target}`);

  //0x7E3099C763AF1130A1c2c5f940FeC76b61766870
  await hre.run('verify:verify', {
    address: swap.target,
    constructorArguments: [
      relayAddress,
    ]
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
