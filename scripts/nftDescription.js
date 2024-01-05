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
const tokenId = 0;

async function main() {

    const contract = await hre.ethers.getContractAt(contractABI, contractAddress);
    console.log(`NFT tokenId ${tokenId}`);
    console.log(`Prompt: ${await contract.promptDescription(tokenId)}`);
    console.log(`NFT owner: ${await contract.ownerOf(tokenId)}`);
    console.log(`URI: ${await contract.tokenURI(tokenId)}`);
    console.log(`URL: https://ipfs.io/ipfs/${await contract.tokenURI(tokenId)}`);

  }

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});