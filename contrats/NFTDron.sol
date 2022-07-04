// SPDX-License-Identifier: MIT
pragma solidity 0.8.1;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract NFTDron is ERC721, Ownable  {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    
    constructor(string memory name, string memory description) ERC721 (name, description) {

    }

    function safeMintDron(address to) public onlyOwner returns(uint256 Id){
         _tokenIdCounter.increment();
        _safeMint(to,_tokenIdCounter.current());
        return(_tokenIdCounter.current());

    }

 
    function _burnDron (uint256 Token, address owner) public {
        require(ownerOf(Token)==owner, "Only the Owner can remove the Dron");
        super._burn(Token);
        

    }

    function _getDataNftDron(uint256 Tokenid) public view returns (address owner) {
         return(ownerOf(Tokenid));

    }
     function _getBalanceall() public view returns(uint256){
        return(_tokenIdCounter.current());
    }

    
}