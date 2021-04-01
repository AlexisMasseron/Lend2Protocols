# Defi Hackathon prep

## LINK: https://hackmd.io/@Oe0sDTBGRI2jMuhtM_mFjQ/rJBKbB52D/edit

## Project Ideas:

- Staking supervisor (tooling / dashboard to help stake on different protocols)
    - happy flow for a demo could be : stake on aave, view staking progress on interface, withdraw to monolith, crypto actually becomes usable irl, profit
    - follow up when we launch our startup after winning the hackathon could be : manage all your staking on a single dashboard, kind of how you manage your different investment accounts in your bank, handles tax reports for you etc
    - the vision : 
        - actually everything you need to live off crypto staking wink wink (simple case is contract based staking like knc, snx, aave, more complex case could be protocols outside of eth1 that allow staking, like eth2, polkadot, tezos, cosmos etc.)
        - basically crypto retail investment account




- Redo some already existing defi project, but replace stablecoins with nft
    - example : take a loan against a nft representing your future financial situation.
    - huge subject on trust/reputation onchain -> link between onchain and offchain identities



- Handle a defi loan like a traditional finance loan
    - main topics:
        - everything you need to assess the risk you're taking with your loan, and actually take the loan
            - comparators with traditional finance, warnings etc
            - smart contract to handle the loan generation
        - bridge between your actual bank account and the stable coin you drew from your debt
            - example : how to automate dai => coinbase account => withdrawal to bank account
        - monthly payments reminders
            - collateral gain : build a credit score

- CD Flashloans
    - create a pool where users can stake their credits delegation tokens and use those tokens to perform flash loans. 
    - Depositor to deposit funds into a smart-contract
    - CD -> Pool -> FL
    - https://docs.aave.com/developers/guides/flash-loans
    - https://docs.aave.com/developers/guides/credit-delegation


# P2P decollaterized lending:

- First flow:
    - User wants to earn extra yield on its governance staking, so he/she logs onto our platform and deposit his/her token into our pool. After doing so, he/she can see some metrics just like a regular staking dashboard (but made simple for the hackathon).
- Second flow:
    - User wants to borrow token from the pool. He/She thus connect to the borrowing interface, fill in the loan request form, (sign a contract?) and gets the loan 

Is it borrowing from the pool or using part of the pool as collateral?


### Tracks
- confirm the scope and finalize the user flow (especially on how to use the pool)
- confirm technical stack and prepare boilerplate


#### Scope

I put a mini-user journey here (you need to login to access) https://miro.com/welcomeonboard/mO0102BuSP5JRd0v7IXymjYdc4RyRnYPhv3RtiYa4EzGnn037lUJrfuYOWNUSyHz

### Stack
    - Front: React, Ethers.js/Web3.js -> I'm down to use Typescript for the front-end and Ethers.js interacts well with TS.
    - Blockchain: truffle, Ethers/web3, typechain
    - Testing: Are we planning on writting some tests -> Y/N? Personnaly I don't think we should but there might be some cases in which it would actually help us (i.e. When building small complexe features): mocha, jest, waffle...


