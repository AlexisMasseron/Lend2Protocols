# L2P.finance:

## Project description:

L2P stands for Lend2Protocols which is a new kind of liquidity provider for Dapps and protocols.

People can come and deposit their funds on our pool, which are actually deposited in the Aave lending pool and delegate its borrowing power to the L2P pool. This way they maximize their earnings, adding an earn extra yield on top of the yield they already earn from the aave protocol plus the L2P pool interests.

On the other hand, Dapps and protocols which are whitelisted can have access to undercollaterized loans.

The whitelisting process is centralized for now but decentralized mechanisms will bed added in the future.

## Architecture:

The L2P architecture is devided in 3 parts: 
- a user interface to allow third party users to deposit their tokens in order to earn extra yields.
-  a smart contract which delegate borrowing powers from depositors to borrowers
-  an API for borrowers to interact with our smart-contract.

## Network & Assets:

Everything is deployed on the Ethereum Kovan testnets and the delegators can only deposit Dai for now. In the future all assets listed on the aave lending pool will be available for deposit.

The L2P pool can be found at this address: `0x259Ca56aA4F2bDF4f170d8CB337Dd7606Ca930a7`

## Project setup

This repository is a mono repository using `yarn` workspace. The code is split into multiple repositories, each sub repository is contained as a folder in `packages`.

Additional informations on a package may be found in their repository `README`.

The different repositories are described as follows:
- `client`: Client React application
- `server`: Server NestJS application
- `contracts`: Ethereum smart contracts using Truffle

It is advised to work from the root of the monorepository.
### Installation

In order to install all the dependencies, use from the root of the mono repository
```bash
yarn install
```

### Local Development Blockchain setup

One may start a local development network using
```bash
yarn ganache:start
```

The default port is `7545`.

Scripts are available in the `contracts` workspace in order to interact and deploy the smarts contracts on the development or Ropsten networks.

### Specific repository script

In order to execute a script on a particular repository, one may use
```bash
# run a script in the client workspace
yarn client <script>

# run a script in the server workspace
yarn server <script>

# run a script in the contracts workspace
yarn contracts <script>
```

These scripts are simple shortcuts of usual `yarn` workspace script
```bash
yarn workspace <myWorkspace> <script>
```

For usual commands, additional shortcuts scripts are available as described below.

#### Client scripts

The following scripts are available for the client workspace
```bash
# execute script in the client workspace
yarn client <script>

# start client
yarn client:start

# run client tests
yarn client:test

# build client application
yarn client:build

# add client dependency
yarn client:add
```

#### Server scripts

The following scripts are available for the server workspace
```bash
# execute script in the client workspace
yarn server <script>

# start server
yarn server:start

# run server tests
yarn server:test

# build server application
yarn server:build

# add server dependency
yarn server:add
```

#### Contracts scripts

The following scripts are available for the contracts workspace
```bash
# execute script in the contracts workspace
yarn contracts <script>

# compile smart contracts
yarn contracts:compile

# run smart contracts tests
yarn contracts:test

# deploy smart contracts to local development network
yarn contracts:deploy:dev

# deploy smart contracts to ropsten network
yarn contracts:deploy:ropsten

# run truffle console for local development network
yarn contracts:console:dev

# run truffle console for ropsten network
yarn contracts:console:ropsten

# add contracts dependency
yarn contracts:add
```
