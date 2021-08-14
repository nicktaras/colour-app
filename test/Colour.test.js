const Colour = artifacts.require('Colour');

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Colour', (accounts) => {

    let contract = null;

    before(async () => {
      contract = await Colour.deployed();
    })

    Colour.deployed().then((_instance) => { console.log(_instance) })

    describe('deployment', async () => {

      it('contract exists', async () => {
        assert.notEqual(Colour, null);
      });
      
      it('deployed successfully', async () => {
        const address = contract.address;
        assert.notEqual(address, null);
      });
      
      it('has a name', async () => {
        const name = await contract.name();
        assert.equal(name, 'Colour');
      });
      
      it('has a symbol', async () => {
        const symbol = await contract.symbol();
        assert.equal(symbol, 'COLR');
      });

    });

    // https://www.youtube.com/watch?v=YPbgjPPC1d0
    // 55.33 mins.
    
    describe('minting', async () => {
      it('creates a new token', async () => {
        const result = await contract.mint("#ffffff");
        const totalSupply = await contract.totalSupply();
        assert.equal(totalSupply, 1);
        const event = result.logs[0].args;
        assert.equal(event.tokenId.toNumber(), 1, 'id is correct');
        assert.equal(event.from, '0x0000000000000000000000000000000000000000');
        assert.equal(event.to, accounts[0], 'to is correct');
        await contract.mint("#ffffff").should.be.rejected;
      });
      
      it('adds to tokens', async () => {
        await contract.mint("#00AA33");
        await contract.mint("#2255BB");
        await contract.mint("#FFCCAA");
        const totalSupply = await contract.totalSupply();
        let colours = [];
        let cc;
        for(var i = 0; i < totalSupply; i++) {
          cc = await contract.getColour(i);
          colours.push(cc);
        }
        const expected = ['#ffffff','#00AA33','#2255BB','#FFCCAA'];
        assert.equal(colours.join(','), expected.join(','), 'to is correct');
      });
    });

})