// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require('hardhat');

const relayAddress = {
  'onedev':'0x7a01625361c50F5A1f0639f64e5d7766D2475e1C'
}[hre.network.name];

async function main() {
  const swap = await hre.ethers.deployContract(
    'CrossLightningSwaps',
    [relayAddress],
    {
      value: 0,
    }
  );

  await swap.waitForDeployment();

  //0xB2d10c4e93b2A8D40C73eeb2a3075B3b45dC7a9d
  console.log(`deploy swap to ${swap.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
