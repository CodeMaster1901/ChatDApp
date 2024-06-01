const hre = require("hardhat");

async function main() {
    // Get the contract factory for ChatDApp
    const ChatDApp = await hre.ethers.getContractFactory("ChatDApp");
    
    // Deploy the contract
    const deployedChatDApp = await ChatDApp.deploy();
    
    // Wait for the deployment to finish
    await deployedChatDApp.deployed();

    // Log the address of the deployed contract
    console.log(`Contract Address is: ${deployedChatDApp.address}`);
}

// Run the main function and catch any errors
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
