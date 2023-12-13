a// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Base contract for common properties like velocity and acceleration
contract MotionProperties {
    int[2] public velocity; // 2D velocity vector (x, y)
    int[2] public acceleration; // 2D acceleration vector (x, y)    
    int public x;
    int public y;
    int public z;

    // Function to set velocity
    function setVelocity(int[2] memory _velocity) public {
        velocity = _velocity;
    }

    // Function to set acceleration
    function setAcceleration(int[2] memory _acceleration) public {
        acceleration = _acceleration;
    }

    function setPosition(int _x, int _y) public {
        x = _x;
        y = _y;
    }
}

//Collision and Movement

// Derived contract for the circle
contract Circle is MotionProperties {
    uint public radius; // Radius of the circle

    // Function to set the radius
    function setRadius(uint _radius) public {
        radius = _radius;
    }

    // Function to update all properties of the circle
    function setCircleProperties(uint _radius, int[2] memory _velocity, int[2] memory _acceleration, int _x, int _y) public {
        setRadius(_radius);
        setVelocity(_velocity);
        setAcceleration(_acceleration);
        setPosition(_x, _y);
    }
}


contract RigidBody {

    struct Vector {
        int x;
        int y;
    }
    
    //Ideally this contract would call our instantiated circle via address, for now we are passing in the circle info
    function tick(Vector memory _velocity, Vector memory _acceleration, Vector memory _position) public pure returns (Vector memory newPosition, Vector memory newVelocity) {

        newVelocity.x = _velocity.x + _acceleration.x;
        newVelocity.y = _velocity.y + _acceleration.y;

        newPosition.x = _position.x + newVelocity.x;
        newPosition.y = _position.y + newVelocity.y;
    }
}