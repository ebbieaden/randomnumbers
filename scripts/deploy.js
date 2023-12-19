// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
require("dotenv").config({ path: ".env" });
const { FEE, VRF_COORDINATOR, LINK_TOKEN, KEY_HASH } = require("../constants");

async function main() {
  const deployerAddr = "0xa44C7014aE6A4f065086dbD5417272DBA1f489f0";
  const deployer = await ethers.getSigner(deployerAddr);

  console.log(
    `Deploying contract with the address ${deployer.address}`
  );

  const randomNumbers = await ethers.deployContract("RandomNumber", [VRF_COORDINATOR, LINK_TOKEN, KEY_HASH, FEE]);
  await randomNumbers.waitForDeployment();
  console.log(`Random Numbers successfully deployed on ${randomNumbers.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
