const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const router = await ethers.deployContract("EduswapV2Router", [], {});
    await router.waitForDeployment();

    console.log("EduswapV2Router contract deployed to:", await router.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
// Deploying contracts with the account: 0x9E18268FA21a3612309211cbE186eA1B81469d96
// EduswapV2Router contract deployed to: 0xe745f43775B760958cd34ee83B3ab0c088F74630