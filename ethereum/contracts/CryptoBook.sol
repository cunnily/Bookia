// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;
//author: cunnily
contract Contact {
    address public owner;
    string public telegram;
    string public discord;
    string public desc;

    constructor (address _owner, string memory _telegram, string memory _discord) {
        owner = _owner;
        telegram = _telegram;
        discord = _discord;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Now allowed");
        _;
    }

    function setTelegram(string memory _telegram) public onlyOwner {
        telegram = _telegram;
    }

    function setDiscord(string memory _discord) public onlyOwner {
        discord = _discord;
    }

    function setDesc(string memory _desc) public onlyOwner {
        desc = _desc;
    }
}

contract ContactFactory {
    mapping(address => address) public ownerToContact;
    
    modifier contactExist() {
        require(ownerToContact[msg.sender] == address(0), "The contact already exists");
        _;
    }

    function deploy(string memory _telegram, string memory _discord) public contactExist {
        Contact newContact = new Contact(msg.sender, _telegram, _discord);
        ownerToContact[msg.sender] = address(newContact);
    }

    function deploy(string memory _telegram) public contactExist {
        Contact newContact = new Contact(msg.sender, _telegram, "");
        ownerToContact[msg.sender] = address(newContact);
    }
}