## Available Scripts

In the project directory, you can run:

### `yarn install`

Installs the dependencies for the smart contracts development and deployment.

### `yarn compile`

Compile the solidity contracts and create the JSON artifacts in `build/contracts`.

### `yarn deploy:dev`

Deploy the contracts on the `development` network.

### `yarn console:dev`

Launch the truffle console on the `development` network.
### `yarn deploy:ropsten`

Deploy the contracts on the `ropsten` network.

### `yarn console:ropsten`

Launch the truffle console on the `ropsten` network.

### `yarn ganache:start`

Launch a development blockchain associated to the `development` network on port `7545`.

## Available networks

### `development`

Local network used to develop and test the smart contracts. The expected port is `7545`.
### `ropsten`

Remtote test network. A private key holding ethers and an infura project ID are required in order to interact with this network.