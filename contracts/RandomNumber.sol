// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/vrf/VRFConsumerBase.sol";

contract RandomNumber is VRFConsumerBase {
    bytes32 internal keyHash;
    uint256 internal fee;
    uint256 public randomResults;

    event RandomNumbersGenerated(uint256 randomNumber);

    constructor(address _vrfCoordinator, address _link, bytes32 _keyHash, uint256 _fee) VRFConsumerBase(_vrfCoordinator, _link) {
        keyHash = _keyHash;
        fee = _fee;
    }

    function getRandomNumber() external {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough link to fulfill randomness");
        requestRandomness(keyHash, fee);
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        randomResults = randomness % 10000;
        emit RandomNumbersGenerated(randomResults);
    }
}