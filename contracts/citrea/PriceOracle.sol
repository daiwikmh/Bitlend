// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

interface AggregatorV3Interface {
    function decimals() external view returns (uint8);
    function description() external view returns (string memory);
    function version() external view returns (uint256);
    function getRoundData(uint80 _roundId) external view returns (
        uint80 roundId,
        int256 answer,
        uint256 startedAt,
        uint256 updatedAt,
        uint80 answeredInRound
    );
    function latestRoundData() external view returns (
        uint80 roundId,
        int256 answer,
        uint256 startedAt,
        uint256 updatedAt,
        uint80 answeredInRound
    );
}

contract PriceOracle is Ownable, ReentrancyGuard {

    struct PriceFeed {
        address feedAddress;
        uint256 heartbeat;
        uint8 decimals;
        bool isActive;
        string description;
        uint256 lastUpdate;
        int256 fallbackPrice;
    }

    struct ManualPrice {
        uint256 price;
        uint256 timestamp;
        address updater;
        bool isActive;
    }

    mapping(address => PriceFeed) public priceFeeds;
    mapping(address => ManualPrice) public manualPrices;
    mapping(address => bool) public authorizedUpdaters;
    
    address[] public supportedTokens;
    address public constant BTC_ADDRESS = address(0x1); // Placeholder for BTC
    uint256 public constant PRICE_DECIMALS = 8;
    uint256 public constant MAX_PRICE_AGE = 3600; // 1 hour
    uint256 public constant EMERGENCY_FALLBACK_TIME = 7200; // 2 hours

    event PriceFeedAdded(address indexed token, address indexed feed, uint256 heartbeat);
    event PriceFeedUpdated(address indexed token, address indexed feed, uint256 heartbeat);
    event PriceFeedRemoved(address indexed token);
    event ManualPriceUpdated(address indexed token, uint256 price, address updater);
    event AuthorizedUpdaterAdded(address indexed updater);
    event AuthorizedUpdaterRemoved(address indexed updater);
    event EmergencyFallbackActivated(address indexed token, int256 fallbackPrice);

    modifier onlyAuthorized() {
        require(authorizedUpdaters[msg.sender] || msg.sender == owner(), "Not authorized");
        _;
    }

    constructor() Ownable(msg.sender) {
        authorizedUpdaters[msg.sender] = true;
    }

    function addPriceFeed(
        address _token,
        address _feedAddress,
        uint256 _heartbeat,
        string memory _description
    ) external onlyOwner {
        require(_token != address(0), "Invalid token address");
        require(_feedAddress != address(0), "Invalid feed address");
        require(_heartbeat > 0, "Invalid heartbeat");

        AggregatorV3Interface feed = AggregatorV3Interface(_feedAddress);
        uint8 decimals = feed.decimals();

        if (!priceFeeds[_token].isActive) {
            supportedTokens.push(_token);
        }

        priceFeeds[_token] = PriceFeed({
            feedAddress: _feedAddress,
            heartbeat: _heartbeat,
            decimals: decimals,
            isActive: true,
            description: _description,
            lastUpdate: block.timestamp,
            fallbackPrice: 0
        });

        emit PriceFeedAdded(_token, _feedAddress, _heartbeat);
    }

    function setManualPrice(address _token, uint256 _price) external onlyAuthorized {
        require(_token != address(0), "Invalid token address");
        require(_price > 0, "Invalid price");

        manualPrices[_token] = ManualPrice({
            price: _price,
            timestamp: block.timestamp,
            updater: msg.sender,
            isActive: true
        });

        emit ManualPriceUpdated(_token, _price, msg.sender);
    }

    function getPrice(address _token) external view returns (uint256) {
        require(_token != address(0), "Invalid token address");

        // Try to get price from Chainlink feed first
        if (priceFeeds[_token].isActive) {
            (uint256 chainlinkPrice, bool isValid) = _getChainlinkPrice(_token);
            if (isValid) {
                return chainlinkPrice;
            }
        }

        // Fallback to manual price
        if (manualPrices[_token].isActive) {
            ManualPrice memory manualPrice = manualPrices[_token];
            require(
                (block.timestamp - manualPrice.timestamp) <= MAX_PRICE_AGE,
                "Manual price too old"
            );
            return manualPrice.price;
        }

        // Emergency fallback price
        if (priceFeeds[_token].isActive && priceFeeds[_token].fallbackPrice > 0) {
            return uint256(priceFeeds[_token].fallbackPrice);
        }

        revert("No valid price available");
    }

    function getBTCPrice() external view returns (uint256) {
        return this.getPrice(BTC_ADDRESS);
    }

    function _getChainlinkPrice(address _token) internal view returns (uint256, bool) {
        PriceFeed memory feed = priceFeeds[_token];
        
        try AggregatorV3Interface(feed.feedAddress).latestRoundData() returns (
            uint80 roundId,
            int256 price,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        ) {
            // Check if price is valid
            if (price <= 0) {
                return (0, false);
            }

            // Check if price is fresh
            if ((block.timestamp - updatedAt) > feed.heartbeat * 2) {
                return (0, false);
            }

            // Convert price to standard decimals (8)
            uint256 adjustedPrice;
            if (feed.decimals < PRICE_DECIMALS) {
                adjustedPrice = uint256(price) * 10**(PRICE_DECIMALS - feed.decimals);
            } else if (feed.decimals > PRICE_DECIMALS) {
                adjustedPrice = uint256(price) / 10**(feed.decimals - PRICE_DECIMALS);
            } else {
                adjustedPrice = uint256(price);
            }

            return (adjustedPrice, true);
        } catch {
            return (0, false);
        }
    }

    function addAuthorizedUpdater(address _updater) external onlyOwner {
        require(_updater != address(0), "Invalid updater address");
        authorizedUpdaters[_updater] = true;
        emit AuthorizedUpdaterAdded(_updater);
    }

    function removeAuthorizedUpdater(address _updater) external onlyOwner {
        authorizedUpdaters[_updater] = false;
        emit AuthorizedUpdaterRemoved(_updater);
    }

    function getSupportedTokens() external view returns (address[] memory) {
        return supportedTokens;
    }
}