// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./TaskToken.sol";
import "./interfaces/AggregatorV3Interface.sol";

contract TaskBoard {
    enum Status { Pending, Submitted, Verified, Paid, Failed }
    struct Task {
        address user;
        uint256 reward;
        Status status;
        uint256 submittedPrice;
        address agent;
    }

    TaskToken public taskToken;
    AggregatorV3Interface public priceFeed;
    address public owner;
    uint256 public taskCount;
    mapping(uint256 => Task) public tasks;

    event TaskPosted(uint256 indexed taskId, address indexed user, uint256 reward);
    event ResultSubmitted(uint256 indexed taskId, address indexed agent, uint256 price);
    event TaskVerified(uint256 indexed taskId, bool success);
    event TaskPaid(uint256 indexed taskId, address indexed agent, uint256 reward);

    constructor(address _taskToken, address _priceFeed) {
        taskToken = TaskToken(_taskToken);
        priceFeed = AggregatorV3Interface(_priceFeed);
        owner = msg.sender;
    }

    function postTask(uint256 reward) external {
        require(reward > 0, "Reward must be positive");
        require(taskToken.transferFrom(msg.sender, address(this), reward), "Transfer failed");
        tasks[taskCount] = Task({
            user: msg.sender,
            reward: reward,
            status: Status.Pending,
            submittedPrice: 0,
            agent: address(0)
        });
        emit TaskPosted(taskCount, msg.sender, reward);
        taskCount++;
    }

    function submitResult(uint256 taskId, uint256 ethUsd) external {
        Task storage task = tasks[taskId];
        require(task.status == Status.Pending, "Task not pending");
        task.submittedPrice = ethUsd;
        task.agent = msg.sender;
        task.status = Status.Submitted;
        emit ResultSubmitted(taskId, msg.sender, ethUsd);
    }

    function verifyAndPay(uint256 taskId) external {
        Task storage task = tasks[taskId];
        require(task.status == Status.Submitted, "Task not submitted");
        (, int256 chainlinkPrice,,,) = priceFeed.latestRoundData();
        require(chainlinkPrice > 0, "Invalid Chainlink price");
        uint256 clPrice = uint256(chainlinkPrice);
        uint256 submitted = task.submittedPrice;
        uint256 tolerance = clPrice / 200; // 0.5%
        bool success = (submitted >= clPrice - tolerance && submitted <= clPrice + tolerance);
        if (success) {
            require(taskToken.transfer(task.agent, task.reward), "Reward transfer failed");
            task.status = Status.Paid;
            emit TaskPaid(taskId, task.agent, task.reward);
        } else {
            task.status = Status.Failed;
        }
        emit TaskVerified(taskId, success);
    }

    function getTask(uint256 taskId) external view returns (Task memory) {
        return tasks[taskId];
    }
} 