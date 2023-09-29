const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../../Models/user');

const saltRounds = 10;
//generate token
function generateToken(adminData) {
    return jwt.sign(adminData, "adminData")
}
//getTokenData
function getTokenData(authorization) {
    const userData = user.findOne({
        token: authorization
    }).then((userData) => {
        res.status(200).json({
            status: true,
            msg: "token view successful",
            data: userData
        })
    }).catch((err) => {
        res.status(500).json({
            status: false,
            msg: "authentication error",
            error: err
        })
    })
}


const userRegister = async (req, res) => {
    const newPassword = await bcrypt.hash(req.body.password, saltRounds);
    new user({
        ...req.body,
        password: newPassword,
    })
        .save()
        .then((userData) => {
            res.status(200).json({
                status: true,
                msg: "user register successful",
                data: userData
            })
        })
        .catch((err) => {
            res.status(500).json({
                status: false,
                msg: "user not registered",
                error: err.message

            })

        })
}

const userLogin = async (req, res) => {
    // console.log(req.body.email,req.body.password )
    await user.findOne({ phone: req.body.phone })
        .then(async (userData) => {

            const passwordMatch = await bcrypt.compare(
                req.body.password,
                userData.password
            )
            //console.log(userData)
            if (passwordMatch && userData != null) {
                res.status(200).json({
                    status: true,
                    msg: "user login successful",
                    data: userData
                })
            } else {
                res.status(500).json({
                    status: false,
                    msg: "password not matching"
                })
            }
        }).catch((err) => {
            res.status(500).json({
                status: false,
                msg: "user not found",
                error: err.message
            })
        })

}

module.exports = {
    userRegister,
    userLogin,
    getTokenData,generateToken

}