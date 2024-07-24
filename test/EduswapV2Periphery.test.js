const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("EduswapV2Periphery Test", function () {
    let owner, addr1;
    let tokenA, tokenB;
    let factory, weth, router;

    before(async function () {
        // Getting signers
        [owner, addr1] = await ethers.getSigners();

        // Deploying the token contract
        tokenA = await ethers.deployContract("ERC20", ["TEST TokenA", "TTA"], {});
        await tokenA.waitForDeployment();
        tokenB = await ethers.deployContract("ERC20", ["TEST TokenB", "TTB"], {});
        await tokenB.waitForDeployment();

        // Deploying the router contract
        router = await ethers.deployContract("EduswapV2Router", [], {});
        await router.waitForDeployment();

        // Creating the pair contract
        const factoryAddr = await router.factory();
        const wethAddr = await router.WETH();
        factory = await ethers.getContractAt("IEduswapV2Factory", factoryAddr);
        weth = await ethers.getContractAt("IWETH", wethAddr);

        await factory.createPair(await tokenA.getAddress(), await tokenB.getAddress());
        await factory.createPair(await tokenA.getAddress(), await weth.getAddress());
    });

    it("Should provide liquidity", async function () {
        // Approve Router to spend token
        await tokenA.connect(owner).approve(await router.getAddress(), ethers.parseEther("10"));
        await tokenB.connect(owner).approve(await router.getAddress(), ethers.parseEther("10"));

        const amountA = ethers.parseEther("1");
        const amountB = ethers.parseEther("1");
        const amountAMin = 0;
        const amountBMin = 0;
        const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

        // Provide liquidity
        await router.connect(owner).addLiquidity(
            await tokenA.getAddress(),
            await tokenB.getAddress(),
            amountA,
            amountB,
            amountAMin,
            amountBMin,
            owner.address,
            deadline,
        );
    });

    it("Should swap exact tokens for tokens", async function () {
        // Approve Router to spend token
        await tokenA.connect(owner).approve(await router.getAddress(), ethers.parseEther("10"));
        await tokenB.connect(owner).approve(await router.getAddress(), ethers.parseEther("10"));

        const amountIn = ethers.parseEther("0.1");
        const amountOutMin = 0; // slippage
        const path = [await tokenA.getAddress(), await tokenB.getAddress()];
        const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

        // Perform the swap
        await expect(
            router.connect(owner).swapExactTokensForTokens(
                amountIn,
                amountOutMin,
                path,
                owner.address,
                deadline
            )
        ).to.emit(tokenA, "Transfer");

        const amountOut = (await router.getAmountsOut(amountIn, path))[1];
        await router.connect(owner).swapExactTokensForTokens(
            amountIn,
            amountOutMin,
            path,
            addr1.address,
            deadline
        );
        expect(await tokenB.balanceOf(addr1.address)).to.be.equal(amountOut);
    });

    it("Should provide liquidity eth", async function () {
        // Approve Router to spend token
        await tokenA.connect(owner).approve(await router.getAddress(), ethers.parseEther("10"));

        const amountA = ethers.parseEther("1");
        const amountB = ethers.parseEther("1");
        const amountAMin = 0;
        const amountBMin = 0;
        const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

        // Provide liquidity
        await router.connect(owner).addLiquidityETH(
            await tokenA.getAddress(),
            amountA,
            amountAMin,
            amountBMin,
            owner.address,
            deadline,
            { value: amountB }
        );
    });

    it("Should swap exact tokens for eth", async function () {
        // Approve Router to spend tokenA
        await tokenA.connect(owner).approve(await router.getAddress(), ethers.parseEther("10"));

        const amountIn = ethers.parseEther("0.1");
        const amountOutMin = 0; // slippage
        const path = [await tokenA.getAddress(), await weth.getAddress()];
        const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

        // Perform the swap
        await expect(
            router.connect(owner).swapExactTokensForETH(
                amountIn,
                amountOutMin,
                path,
                owner.address,
                deadline
            )
        ).to.emit(tokenA, "Transfer");

        const amountOut = (await router.getAmountsOut(amountIn, path))[1];
        await router.connect(owner).swapExactTokensForETH(
            amountIn,
            amountOutMin,
            path,
            addr1.address,
            deadline
        );
        expect(await tokenB.balanceOf(addr1.address)).to.be.equal(amountOut);
    });
});