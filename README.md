# EduswapV2Periphery Contract

This repository contains the EduswapV2Periphery contract, which complements the EduswapV2Core by providing additional functionalities such as router contracts and other utilities.

### Deployment Address

- EduswapV2Router: [0xe745f43775B760958cd34ee83B3ab0c088F74630](https://opencampus-codex.blockscout.com/address/0xe745f43775B760958cd34ee83B3ab0c088F74630)
- USDC: [0x7aFB87aE9E37c365955012527f8a9039D6F2CA30](https://opencampus-codex.blockscout.com/address/0x7aFB87aE9E37c365955012527f8a9039D6F2CA30)
- BTC: [0x324e4d9afbEe1b5cA0c0F37e7b771a18094B39A6](https://opencampus-codex.blockscout.com/address/0x324e4d9afbEe1b5cA0c0F37e7b771a18094B39A6)
- ETH: [0x90f2F4E97Eb6B62D9049D07C6f6877FD171a9a0F](https://opencampus-codex.blockscout.com/address/0x90f2F4E97Eb6B62D9049D07C6f6877FD171a9a0F)
- ARB: [0x3FBA3ef10e452D1e8Cc6C0cf552A8A25b572Ec41](https://opencampus-codex.blockscout.com/address/0x3FBA3ef10e452D1e8Cc6C0cf552A8A25b572Ec41)
- EDUSWAP: [0x104A0F99728D5a79dbEbB4a0a58eCcb456e82411](https://opencampus-codex.blockscout.com/address/0x104A0F99728D5a79dbEbB4a0a58eCcb456e82411)

## Prerequisites

- Node.js v12+ LTS and npm (comes with Node)
- Hardhat

## Installation

### Clone the repository:

```bash
git clone https://github.com/educhain/v2-periphery
```

### Navigate to the project folder:

```bash
cd v2-periphery
```

### Install dependencies:

```bash
npm istall
```

## Set Up Configuration

1. Review the .example.env file.
2. Create a .env file based on the example and adjust the values as needed.

### For Linux or macOS:

```bash
cp .example.env .env
```

### Windows:

```bash
copy .example.env .env
```

## Compilation

Compile the smart contracts using Hardhat:

```bash
npx hardhat compile
```

## Quick Start Guide

### 1. Testing

Run the following command to execute the contract tests. Ensure you've written the tests in your Hardhat project's test directory.

```bash
npx hardhat test
```

### 2. Deployment

Run the following command to compile the contracts using the Solidity compiler and deploy the EduswapV2Router to your Edu chain network.

```bash
npx hardhat run scripts/deploy.js --network edutest
```

## Conclusion

If you would like to contribute to the project, please fork the repository, make your changes, and then submit a pull request. We appreciate all contributions and feedback!
