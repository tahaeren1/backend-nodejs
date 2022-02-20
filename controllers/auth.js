const User = require('../models/User')
const CustomError = require('../helpers/error/CustomError');
const asyncErrorWrapper = require('express-async-handler');
const {
    sendJwtToClient
} = require("../helpers/authorization/tokenHelpers");

const register = asyncErrorWrapper(async (req, res, next) => {
    // post data


    const {
        name,
        email,
        password,
        role
    } = req.body;
    const user = await User.create({
        name,
        email,
        password
    });
    sendJwtToClient(user, res);

});
const login = asyncErrorWrapper(async (req,res,next) => {
    res.status(200)
    .json({
        success : true
    });
});

        const getUser = (req, res, next) => {
            res.json({
                success: true,
                data: {
                    id: req.user.id,
                    name: req.user.name
                }
            })
        };
        module.exports = {
            register,
            getUser,
            login
        }