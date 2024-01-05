// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MetaToken is ERC721A, Ownable {
    constructor() Ownable() ERC721A("MetaToken", "MTN") {}

    uint256 private limit = 5;
    string[] private descriptions = [
        "A young super hero",
        "Blood thirsty boxer awaiting to devour opponent",
        "A tall huge hulk",
        "Tall drunk sexy lady",
        "Spider man in the building"
    ];
    mapping(uint256 => string) private _tokenURIs;


    function _baseURI() internal pure override returns (string memory) {
        return "QmPrnJzY41W8qhSEzb4yUnG9jK7R6emyX8XsUxVt6tDtdx";
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        if (!_exists(tokenId)) revert("No Token Exists");

        string memory baseURI = _baseURI();
        string memory tokenIdStr = _toString(tokenId);
        string memory extension = ".jpg";
    return bytes(baseURI).length != 0 ? string(abi.encodePacked(baseURI, "/", tokenIdStr, extension)) : '';
    }

    function promptDescription(uint256 tokenId) public view returns(string memory) {
        return descriptions[tokenId];
    }

    function mint(address reciever, uint256 quantity) external onlyOwner {
        require(reciever != address(0), "Invalid Address");
        require( totalSupply() < limit, "Maximum NFT Minted");
        _safeMint(reciever, quantity); 
    }
}