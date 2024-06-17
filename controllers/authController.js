const jwt = require('jsonwebtoken')
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError')

// sign the payload into a jwt token
const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
});

exports.signUp = catchAsync(async (req, res, next) => {
    const newUser = await  User.create({
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    });

    const token = signToken(newUser._id);

    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser,
        }
    });
});

exports.login = catchAsync(async (req, res, next) => {
    // get email and password from request body
    const { email, password } = req.body

    // check if email and password exist in the input field 
    if (!email || !password) {
        return next(new AppError('Please provide email and password!, 400'));
    }

    // find document that contains the email and modifies the query to include the password field in the returned document
    const user = await User.findOne({ email }).select('+password')

    // check if user exists or if password is incorrect
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401))
    }

    // create jwt token and send to client as part of response to authenticate user
    const token = signToken(user._id);

    res.status(200).json({
        status: 'success',
        token,
    });
})