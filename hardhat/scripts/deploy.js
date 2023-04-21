const {ethers} = require("hardhat");

async function main() {
  const CeloNFTFactory = await ethers.getContractFactory("CeloNFT");

  const celoNFTCon = await CeloNFTFactory.deploy();
  await celoNFTCon.deployed();

  console.log("Celo NFT deployed to: ", celoNFTCon.address);

  

  const NFTMRKFactory = await ethers.getContractFactory("NFTMarketplace");
  const NFTMRKContract = await NFTMRKFactory.deploy();
  await NFTMRKContract.deployed();

  console.log("NFT Marketplace deployed to: ", NFTMRKContract.address);
}

main().catch((e) => {
  console.error(e);
  process.exitCode =1;
});