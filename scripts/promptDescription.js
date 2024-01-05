// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const contractJSON = require("../artifacts/contracts/MetaToken.sol/MetaToken.json");
require('dotenv').config()

const contractAddress = "0xACe3992b9B3438E3C0A89F486020BEb592A231a5";
const contractABI = contractJSON.abi;

async function main() {

    const contract = await hre.ethers.getContractAt(contractABI, contractAddress);
    const totalNFTs = await contract.totalSupply();
    
    for (let i = 0; i < totalNFTs; i++) {
      console.log(`Prompt ${i + 1}: ${await contract.promptDescription(i)}`);
    }
  }

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});