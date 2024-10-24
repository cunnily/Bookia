const hre = require("hardhat");

async function main() {
    const ContactFactory = await hre.ethers.getContractFactory("ContactFactory");
    const contactFactory = await ContactFactory.deploy();

    await contactFactory.waitForDeployment();
    const contactFactoryAddress = await contactFactory.getAddress();

    console.log("ContactFactory deployed at:", contactFactoryAddress);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });