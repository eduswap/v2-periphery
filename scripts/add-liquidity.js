const { ethers } = require("hardhat");

const USDCAddress = "0x7aFB87aE9E37c365955012527f8a9039D6F2CA30";
// const BTCAddress = "0x324e4d9afbEe1b5cA0c0F37e7b771a18094B39A6";
const ETHAddress = "0x90f2F4E97Eb6B62D9049D07C6f6877FD171a9a0F";
const ARBAddress = "0x3FBA3ef10e452D1e8Cc6C0cf552A8A25b572Ec41";
const EDUSWAPAddress = "0x104A0F99728D5a79dbEbB4a0a58eCcb456e82411";

async function addLiquidity(deployer, tokenAAddress, tokenBAddress, amountA, amountB) {
    const tokenA = await ethers.getContractAt("ERC20", tokenAAddress);
    const tokenB = await ethers.getContractAt("ERC20", tokenBAddress);
    const router = await ethers.getContractAt("EduswapV2Router", "0xe745f43775B760958cd34ee83B3ab0c088F74630");

    tx = await tokenA.approve(await router.getAddress(), ethers.MaxUint256);
    await tx.wait();
    console.log("approve tokenA:", tx.hash);

    tx = await tokenB.approve(await router.getAddress(), ethers.MaxUint256);
    await tx.wait();
    console.log("approve tokenB:", tx.hash);

    tx = await router.addLiquidity(
        tokenAAddress,
        tokenBAddress,
        amountA,
        amountB,
        amountA,
        amountB,
        deployer.address,
        ethers.MaxUint256,
    );
    await tx.wait();
    console.log("add liquidity:", tx.hash);
}

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const weth = await ethers.getContractAt("IWETH", "0xbd51800607E7C743a0e9b0D89D837058F4f42756");
    tx = await weth.deposit({ value: "1" + "0".repeat(18) });
    await tx.wait();
    console.log("weth deposit:", tx.hash);

    console.log("1. USDC-EDU");
    await addLiquidity(deployer, USDCAddress, await weth.getAddress(), "61930", "1" + "0".repeat(17));
    console.log("2. USDC-ARB");
    await addLiquidity(deployer, USDCAddress, ARBAddress, "71170" + "0".repeat(6), "100000" + "0".repeat(18));
    console.log("3. USDC-ETH");
    await addLiquidity(deployer, USDCAddress, ETHAddress, "32088" + "0".repeat(6), "10" + "0".repeat(18));
    console.log("4. USDC-EDUSWAP");
    await addLiquidity(deployer, USDCAddress, EDUSWAPAddress, "10000" + "0".repeat(6), "10000" + "0".repeat(18));


    console.log("5. EDU-ARB");
    await addLiquidity(deployer, await weth.getAddress(), ARBAddress, "1" + "0".repeat(17), "1" + "0".repeat(17));
    console.log("6. EDU-ETH");
    await addLiquidity(deployer, await weth.getAddress(), ETHAddress, "1" + "0".repeat(17), "3" + "0".repeat(14));
    console.log("7. EDU-EDUSWAP");
    await addLiquidity(deployer, await weth.getAddress(), EDUSWAPAddress, "1" + "0".repeat(17), "1" + "0".repeat(17));

    console.log("8. ARB-ETH");
    await addLiquidity(deployer, ARBAddress, ETHAddress, "1" + "0".repeat(17), "3" + "0".repeat(14));
    console.log("9. ARB-EDUSWAP");
    await addLiquidity(deployer, ARBAddress, EDUSWAPAddress, "1" + "0".repeat(17), "1" + "0".repeat(17));

    console.log("10. ETH-EDUSWAP");
    await addLiquidity(deployer, ETHAddress, EDUSWAPAddress, "3" + "0".repeat(14), "1" + "0".repeat(17));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });