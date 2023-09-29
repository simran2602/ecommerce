const mongoose = require('mongoose');
const admin = require('../../Models/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

saltRounds = 10;

//generate token
function generateToken(adminData) {
    return jwt.sign(adminData, "adminData")
}

//getTokenData
function getTokenData(authorization) {
    const adminData = user.findOne({
        token: authorization
    }).then((adminData) => {
        res.status(200).json({
            status: true,
            msg: "token view successful",
            data: adminData
        })
    }).catch((err) => {
        res.status(500).json({
            status: false,
            msg: "authentication error",
            error: err
        })
    })
}

const adminRegister = async (req, res) => {
    //console.log(req.body.password)
    const newPassword = await bcrypt.hash(req.body.password, saltRounds);
    new admin({
        ...req.body,
        password: newPassword,
        token: generateToken(req.body)
    })
        .save()
        .then((adminData) => {
            res.status(200).json({
                status: true,
                msg: "admin register successful",
                data: adminData
            })
        }).catch((err) => {
            res.status(500).json({
                status: false,
                msg: "admin not registered",
                error: err
            })
        })
}

const adminLogin = async (req, res) => {
    // console.log(req.body.email,req.body.password )
    await admin.findOne({ email: req.body.email })


        .then(async (adminData) => {

            const passwordMatch = await bcrypt.compare(
                req.body.password,
                adminData.password
            )
            console.log(adminData)
            if (passwordMatch && adminData != null) {
                res.status(200).json({
                    status: true,
                    msg: "admin login successful",
                    data: adminData
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
                msg: "admin not found",
                error: err.message
            })
        })

}


module.exports = {
    adminRegister,
    adminLogin,
    generateToken,
    getTokenData


}