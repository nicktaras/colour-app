// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Colour is ERC721, ERC721Enumerable, Pausable, Ownable, ERC721Burnable {
    using Counters for Counters.Counter;
    
    string[] public colours;
    mapping(string => bool) _colourExists;

    Counters.Counter private _tokenIdCounter;

    // contract name and token name
    constructor() ERC721("Colour", "COLR") {}

    // create token
    function safeMint(address to) public onlyOwner {
        _safeMint(to, _tokenIdCounter.current());
        _tokenIdCounter.increment();
    }

    // should be an owner for production use
    function mint(string memory _colour) public { 
      require(!_colourExists[_colour], 'Colour must be unique');
      colours.push(_colour);
      uint256 _id = colours.length;
      _mint(msg.sender, _id);
      _colourExists[_colour] = true;
    }

    // find colour via index
    function getColour(uint index) external view returns(string memory) {
        return colours[index];
    }

    // pause contract only owner
    function pause() public onlyOwner {
        _pause();
    }

    // unpause contract only owner
    function unpause() public onlyOwner {
        _unpause();
    }

    // 
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    //
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

