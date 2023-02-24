const { task } = require("hardhat/config")

task("block-number", "prints the current block number ").setAction(
    async (taskArgs, hre) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`the current block number is:    ${blockNumber}`)
    }
)

module.exports = {}
