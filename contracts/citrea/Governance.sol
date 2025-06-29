// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Governance is Ownable {
    IERC20 public btldToken;
    uint256 public proposalCount;
    struct Proposal {
        uint256 id;
        address proposer;
        string description;
        uint256 forVotes;
        uint256 againstVotes;
        uint256 deadline;
        bool executed;
    }
    mapping(uint256 => Proposal) public proposals;
    mapping(address => mapping(uint256 => bool)) public voted;

    event ProposalCreated(uint256 id, address proposer, string description);
    event Voted(address voter, uint256 proposalId, bool support);
    event ProposalExecuted(uint256 id);

    constructor(address _btldToken) Ownable(msg.sender) {
        btldToken = IERC20(_btldToken);
    }

    // Create a new proposal
    function createProposal(string calldata description, uint256 duration) external {
        require(btldToken.balanceOf(msg.sender) > 0, "Must hold BTLD to propose");
        proposalCount++;
        proposals[proposalCount] = Proposal({
            id: proposalCount,
            proposer: msg.sender,
            description: description,
            forVotes: 0,
            againstVotes: 0,
            deadline: block.timestamp + duration,
            executed: false
        });
        emit ProposalCreated(proposalCount, msg.sender, description);
    }

    // Vote on a proposal
    function vote(uint256 proposalId, bool support) external {
        Proposal storage proposal = proposals[proposalId];
        require(block.timestamp < proposal.deadline, "Proposal expired");
        require(!voted[msg.sender][proposalId], "Already voted");
        uint256 votingPower = btldToken.balanceOf(msg.sender);
        require(votingPower > 0, "No voting power");
        voted[msg.sender][proposalId] = true;
        if (support) {
            proposal.forVotes += votingPower;
        } else {
            proposal.againstVotes += votingPower;
        }
        emit Voted(msg.sender, proposalId, support);
    }

    // Execute proposal (simplified: assumes admin execution)
    function executeProposal(uint256 proposalId) external onlyOwner {
        Proposal storage proposal = proposals[proposalId];
        require(block.timestamp >= proposal.deadline, "Proposal still active");
        require(!proposal.executed, "Already executed");
        require(proposal.forVotes > proposal.againstVotes, "Proposal rejected");
        proposal.executed = true;
        emit ProposalExecuted(proposalId);
    }
}