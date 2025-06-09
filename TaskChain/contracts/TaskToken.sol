// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TaskToken is ERC20 {
    constructor() ERC20("Task Token", "TASK") {
        _mint(msg.sender, 1_000_000 * 10 ** decimals());
    }
} 