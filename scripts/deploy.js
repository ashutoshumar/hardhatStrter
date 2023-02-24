const { ethers, run, network } = require("hardhat")

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )

    console.log("deploying ...")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.deployed()
    console.log(`deployed to ${simpleStorage.address}`)
    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        await simpleStorage.deployTransaction.wait(6)
        await verify(simpleStorage.address, [])
    }

    const currentValue = await simpleStorage.retrive()
    console.log(`current value is : ${currentValue}`)
    const transectionResponse = await simpleStorage.store(18)
    await transectionResponse.wait(1)
    const updatedValue = await simpleStorage.retrive()
    console.log(`updated value is : ${updatedValue}`)
}
async function verify(contractAddress, args) {
    console.log("verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("already verified")
        } else {
            console.log(e)
        }
    }
}
main()
    .then(() => {
        process.exit(0)
    })
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
