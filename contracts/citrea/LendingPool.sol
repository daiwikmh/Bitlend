// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract LendingPool is Ownable, ReentrancyGuard {
    uint256 public totalValueLocked; // Total Bitcoin deposited
    uint256 public utilizationRate; // Percentage of pool lent out
    uint256 public baseAPY; // Base annual percentage yield (in basis points, e.g., 500 = 5%)
    mapping(address => uint256) public balances; // User deposits
    mapping(address => uint256) public lastUpdate; // Timestamp of last interest calculation

    event Deposited(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);

    constructor(uint256 _baseAPY) Ownable(msg.sender) {
        baseAPY = _baseAPY;
    }

    // Deposit Bitcoin into the pool
    function deposit() external payable nonReentrant {
        require(msg.value > 0, "Deposit amount must be greater than 0");
        balances[msg.sender] += msg.value;
        totalValueLocked += msg.value;
        lastUpdate[msg.sender] = block.timestamp;
        emit Deposited(msg.sender, msg.value);
    }

    // Withdraw Bitcoin with accrued interest
    function withdraw(uint256 amount) external nonReentrant {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        uint256 interest = calculateInterest(msg.sender);
        balances[msg.sender] -= amount;
        totalValueLocked -= amount;
        lastUpdate[msg.sender] = block.timestamp;
        payable(msg.sender).transfer(amount + interest);
        emit Withdrawn(msg.sender, amount + interest);
    }

    // Calculate interest based on time and APY
    function calculateInterest(address user) public view returns (uint256) {
        uint256 timeElapsed = block.timestamp - lastUpdate[user];
        return (balances[user] * baseAPY * timeElapsed) / (365 days * 10000); // Basis points
    }

    // Update APY (governance or admin)
    function updateAPY(uint256 newAPY) external onlyOwner {
        baseAPY = newAPY;
    }
}