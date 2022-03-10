const jwt = require('jsonwebtoken');
const { randomBytes, scryptSync, timingSafeEqual } = require('crypto');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const mongoose = require('mongoose');

// function to create a token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}
// quick function to make it easier to throw status codes with messages
// could be a helper function in a separate folder
const throwCustomError = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
}

const registerUser = asyncHandler( async (req, res) => {

    const { name, email, password } = req.body;
    // make sure we have everything from front-end
    if(!name || !email || !password){
        res.status(400);
        throw throwCustomError('Please add all fields', 400);
    }
    // check if user already exists
    const userExists = await User.findOne({email: email});
    // we might want to check if username is in use
    const userNameTaked = await User.findOne({name: name});

    if(userExists){
        // give back an error if user exists
        res.status(400);
        throw throwCustomError('User already exists', 400);
    }else if(userNameTaked){
        // give back an error if username is taken
        res.status(400);
        throw throwCustomError('Username is taken', 400);
    }

    // encript the password
    const salt = randomBytes(16).toString('hex');
    const hashedPassword = scryptSync(password, salt, 64).toString('hex');
    // create user
    const user = await User.create({
        name,
        email,
        password: `${salt}:${hashedPassword}`,
    });
    // when user is created return the data with a token for security later
    if(user){
        console.log('User created ' + user.name);
        res.status(201).json({
            message: 'User registered as',
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else{
        res.status(400);
        throw throwCustomError('Invalid user data', 400);
    }

});

const loginUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body;
    // get user from DB later this wont be needed or will be changed
    const  user = await User.findOne({email: email});
    // nested if's are not the best but this is good for now and its only two
    // if this gets longer there should be a switch case here to handle possible errors
    if(user){

        // we need to split the salt from the password and use the salt to see if entered password is correct
        const [salt, key] = user.password.split(':');
        const hashedByffer = scryptSync(password, salt, 64);
        // we create a buffer from the password that was in the database to compare with entered password
        const keyBuffer = Buffer.from(key, 'hex');
        // timingSafeEqual is to prevent timing attacks
        const match = timingSafeEqual(hashedByffer, keyBuffer);

        if(match){
            // we match the entered and saved passwords in buffer format
            console.log('user is correct');
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        } else {
            // if the password dont match we return information
            res.status(400);
            throw throwCustomError('Invalid password', 400);
        }

    } else {
        res.status(400);
        throw throwCustomError('User was not found', 400);
    }

});

const getUser = asyncHandler( async (req, res) => {
    // did this because mongoose expects an object
    // and this lets us see more possible errors like invalid id lenghts
    const userId = mongoose.Types.ObjectId(req.body.id);
    // finds user by id
    const user = await User.findById(userId);

    if(user){
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
        })
    } else {
        throw throwCustomError('User not found', 400);
    }
    
});

module.exports = {
    registerUser,
    loginUser,
    getUser
}