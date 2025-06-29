// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Staking is Ownable, ReentrancyGuard {
    IERC20 public btldToken; // Governance token
    uint256 public rewardRate; // Rewards per second per staked unit
    mapping(address => uint256) public stakedBTC; // Staked Bitcoin
    mapping(address => uint256) public stakedBTLD; // Staked BTLD tokens
    mapping(address => uint256) public lastRewardTime; // Last reward calculation

    event Staked(address indexed user, uint256 btcAmount, uint256 btldAmount);
    event Unstaked(address indexed user, uint256 btcAmount, uint256 btldAmount);
    event RewardClaimed(address indexed user, uint256 amount);

    constructor(address _btldToken, uint256 _rewardRate) Ownable(msg.sender) {
        btldToken = IERC20(_btldToken);
        rewardRate = _rewardRate;
    }

    // Stake Bitcoin or BTLD tokens
    function stake(uint256 btldAmount) external payable nonReentrant {
        if (msg.value > 0) {
            stakedBTC[msg.sender] += msg.value;
        }
        if (btldAmount > 0) {
            btldToken.transferFrom(msg.sender, address(this), btldAmount);
            stakedBTLD[msg.sender] += btldAmount;
        }
        lastRewardTime[msg.sender] = block.timestamp;
        emit Staked(msg.sender, msg.value, btldAmount);
    }

    // Unstake and claim rewards
    function unstake(uint256 btcAmount, uint256 btldAmount) external nonReentrant {
        uint256 reward = calculateReward(msg.sender);
        if (btcAmount > 0) {
            require(stakedBTC[msg.sender] >= btcAmount, "Insufficient BTC staked");
            stakedBTC[msg.sender] -= btcAmount;
            payable(msg.sender).transfer(btcAmount);
        }
        if (btldAmount > 0) {
            require(stakedBTLD[msg.sender] >= btldAmount, "Insufficient BTLD staked");
            stakedBTLD[msg.sender] -= btldAmount;
            btldToken.transfer(msg.sender, btldAmount);
        }
        if (reward > 0) {
            btldToken.transfer(msg.sender, reward);
            emit RewardClaimed(msg.sender, reward);
        }
        lastRewardTime[msg.sender] = block.timestamp;
        emit Unstaked(msg.sender, btcAmount, btldAmount);
    }

    // Calculate pending rewards
    function calculateReward(address user) public view returns (uint256) {
        uint256 timeElapsed = block.timestamp - lastRewardTime[user];
        return (stakedBTLD[user] * rewardRate * timeElapsed) / 1e18;
    }
}