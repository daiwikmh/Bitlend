// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Treasury is Ownable {
    IERC20 public btldToken;
    uint256 public totalFees;
    mapping(address => uint256) public pendingRewards;

    event FeesCollected(address indexed source, uint256 amount);
    event RewardsDistributed(address indexed user, uint256 amount);

    constructor(address _btldToken) Ownable(msg.sender) {
        btldToken = IERC20(_btldToken);
    }

    // Collect fees from other contracts
    function collectFees(uint256 amount) external payable {
        totalFees += msg.value;
        emit FeesCollected(msg.sender, msg.value);
    }

    // Distribute rewards to users
    function distributeRewards(address user, uint256 amount) external onlyOwner {
        pendingRewards[user] += amount;
        btldToken.transfer(user, amount);
        emit RewardsDistributed(user, amount);
    }

    // Withdraw fees to owner (for protocol sustainability)
    function withdrawFees(uint256 amount) external onlyOwner {
        require(totalFees >= amount, "Insufficient fees");
        totalFees -= amount;
        payable(owner()).transfer(amount);
    }
}