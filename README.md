# totem-soul-nft

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

Gotchas:

When testing with Truffle, you can only deploy a contract once like you would with an actual block chain test or main net. When changes are made, working within Truffle/Ganache, make sure to create a new workspace.