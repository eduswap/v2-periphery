# EduswapV2Periphery Contract

This repository contains the EduswapV2Periphery contract, which complements the EduswapV2Core by providing additional functionalities such as router contracts and other utilities.

### Deployment Address

- EduswapV2Router: [0xe745f43775B760958cd34ee83B3ab0c088F74630](https://opencampus-codex.blockscout.com/address/0xe745f43775B760958cd34ee83B3ab0c088F74630)

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
