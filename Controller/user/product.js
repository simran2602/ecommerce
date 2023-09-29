const mongoose = require('mongoose');
const productModel = require('../../Models/product');

const getProd = (req,res)=>{
    productModel.aggregate([
        {
            $match:{
                isDeleted:false
            }
        }
    ]).then((prodData)=>{
        res.status(200).json({
            status:true,
            msg:"product get successfully",
            data:prodData
        })
    }).catch((err)=>{
        res.status(500).json({
            status:false,
            msg:"product not found",
            error:err
        })
    })

}

module.exports = {
    getProd

}