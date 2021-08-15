# Colour

This is a simple DAPP to demonstrate how NFT's can be created in the form of unique Hex values (colours) and shown on screen, only 
those owned by that user (wallet address).

The react code can be run and seen via the ropsten network, or run locally via Ganache.

Setup:

1. Open Ganache Blockchain Server
2. `npm install` to install deps
3. `npm run start` to start react
4. connect wallet (instructions below)
5. See colours in view added by the user

Commands:

`truffle test` - test the contracts.
`truffle compile` - will compile your contracts.
`truffle migrate` - will migrate your contracts.
`truffle console` - open up cli console
`Colour.deployed()` - will share the smart contract e.g. Colour's methods
`colour = await Colour.deployed();` - same as above but async data

Add ganache local to meta mask

- network name: "anything"
- RPC URL: HTTP://127.0.0.1:7545
- CHAIN ID: 1337
- Symbol: "anything"

# deploy

1. To compile contract, `truffle compile`
2. To deploy the contract, `truffle migrate --network ropsten`
3. To read the contract state, `node contract-read.js`
4. To update the contract state, `node contract-update.js`

Gotchas:

When testing with Truffle, you can only deploy a contract once like you would with an actual block chain test or main net. When changes are made, working within Truffle/Ganache, make sure to create a new workspace.

# Ropsden

 Deploying 'Migrations'
   ----------------------
   > transaction hash:    0xb3fdf3de094aad47a2b3601aa16fb66cb31b16f476c3d50c41c645a18630a268
   > Blocks: 1            Seconds: 24
   > contract address:    0x01373F393F30099061D14907E520CF3457fc0D8F
   > block number:        10840050
   > block timestamp:     1629005993
   > account:             0x16280eeE823Ba628E9Ef5e2036c253B253fE31Fe
   > balance:             0.986554321000357
   > gas used:            271688 (0x42548)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00543376 ETH

Deploying 'Colour'
   ------------------
   > transaction hash:    0x45ec952e2e9ea2d05820b9a3059c709c97719e0e09a10ab9960b9f0285e28540
   > Blocks: 0            Seconds: 24
   > contract address:    0x25eB95dD599287158654597a1e76D8b4E9e1F410
   > block number:        10840053
   > block timestamp:     1629006034
   > account:             0x16280eeE823Ba628E9Ef5e2036c253B253fE31Fe
   > balance:             0.915653481000357
   > gas used:            3499104 (0x356460)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.06998208 ETH  

Summary
=======
> Total deployments:   2
> Final cost:          0.07541584 ETH

