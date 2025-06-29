// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Borrowing is Ownable, ReentrancyGuard {
    IERC20 public stablecoin; // Stablecoin (e.g., USDC)
    uint256 public collateralRatio; // Min collateral ratio (e.g., 150% = 15000 basis points)
    mapping(address => uint256) public collateral; // Bitcoin collateral
    mapping(address => uint256) public borrowed; // Borrowed stablecoin amount

    event Borrowed(address indexed user, uint256 amount);
    event Repaid(address indexed user, uint256 amount);

    constructor(address _stablecoin, uint256 _collateralRatio) Ownable(msg.sender) {
        stablecoin = IERC20(_stablecoin);
        collateralRatio = _collateralRatio;
    }

    // Deposit Bitcoin as collateral and borrow stablecoins
    function borrow(uint256 amount) external payable nonReentrant {
        require(msg.value > 0, "Collateral required");
        uint256 maxBorrow = (msg.value * 10000) / collateralRatio; // Assumes oracle price = 1 for simplicity
        require(amount <= maxBorrow, "Exceeds borrow limit");
        collateral[msg.sender] += msg.value;
        borrowed[msg.sender] += amount;
        stablecoin.transfer(msg.sender, amount);
        emit Borrowed(msg.sender, amount);
    }

    // Repay borrowed stablecoins and reclaim collateral
    function repay(uint256 amount) external nonReentrant {
        require(borrowed[msg.sender] >= amount, "Invalid repayment amount");
        stablecoin.transferFrom(msg.sender, address(this), amount);
        borrowed[msg.sender] -= amount;
        uint256 collateralToReturn = (amount * collateralRatio) / 10000;
        collateral[msg.sender] -= collateralToReturn;
        payable(msg.sender).transfer(collateralToReturn);
        emit Repaid(msg.sender, amount);
    }

    // Update collateral ratio (governance or admin)
    function updateCollateralRatio(uint256 newRatio) external onlyOwner {
        collateralRatio = newRatio;
    }
}