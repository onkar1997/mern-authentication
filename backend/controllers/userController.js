import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({email});

    if(userExist) {
        res.status(400);
        throw new Error('User already exists !')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if(user){
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    }
    else {
        res.status(401);
        throw new Error('Invalid user data !');
    }

    res.status(200).json({
        message: 'Register User'
    });
});

const login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({email});
    console.log(user)

    if(user && (await user.matchPassword(password))) {
        generateToken(res, user._id);

        res.status(201).json({
            message: "User loggedin.",
            _id: user._id,
            name: user.name,
            email: user.email
        });
    }
    else {
        res.status(401);
        throw new Error('Invalid email or password !');
    }
});

const logout = asyncHandler(async (req, res) => {

    res.cookie('jwt', '', {
        httpOnly: true,
        expiresIn: new Date(0)
    })

    res.status(200).json({
        message: 'User logged out.'
    });
});

const getUserProfile = asyncHandler(async (req, res) => {

    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }

    res.status(200).json(user);
});

const updateUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id);

    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password){
            user.password = req.body.password || user.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            message: 'User Profile Updated...',
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        });
    }
    else {
        res.status(404);
        throw new Error('User not found !');
    }
});

export { register, login, logout, getUserProfile, updateUserProfile };