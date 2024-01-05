// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const contractJSON = require("../artifacts/contracts/MetaToken.sol/MetaToken.json");
require('dotenv').config()

const contractAddress = "0x1b3E4eE2Fc0bA50B6e9B79ECC642Cde447eF93cD";
const contractABI = contractJSON.abi;
const walletAddress = "0xA01a35008951beCaC133303Bff7C49968Da5b540";
let noOfNFTs = 5;
async function main() {

    const contract = await hre.ethers.getContractAt(contractABI, contractAddress);
  
    const tx = await contract.mint(walletAddress, noOfNFTs);
    await tx.wait();

    console.log(walletAddress + " now has: " + await contract.balanceOf(walletAddress) + " NFTs");
  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });