const mongoose = require('mongoose');
const orderDetailsModel = require('../../Models/orderDetails');
const generateUniqueId = require('generate-unique-id');
const addToOrderDetail = (req, res) => {
    new orderDetailsModel({
        invoiceId:generateUniqueId(),        
        ...req.body
    })
        .save()
        .then((ordDetaildData)=>{
            res.status(200).json({
                status:true,
                msg:"add to orderDetail successful",
                data:ordDetaildData
            })
        })
        .catch((err)=>{
            res.status(500).json({
                status:false,
                msg:"product not added to orderDetail",
                error:err
            })
        })
}
module.exports={
    addToOrderDetail
}