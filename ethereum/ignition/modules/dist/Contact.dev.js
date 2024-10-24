"use strict";

var hre = require("hardhat");

function main() {
  var ContactFactory, contactFactory, contactFactoryAddress;
  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(hre.ethers.getContractFactory("ContactFactory"));

        case 2:
          ContactFactory = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(ContactFactory.deploy());

        case 5:
          contactFactory = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(contactFactory.waitForDeployment());

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(contactFactory.getAddress());

        case 10:
          contactFactoryAddress = _context.sent;
          console.log("ContactFactory deployed at:", contactFactoryAddress);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  });
}

main().then(function () {
  return process.exit(0);
})["catch"](function (error) {
  console.error(error);
  process.exit(1);
});