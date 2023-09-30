const mongoose = require('mongoose');
const orderProductModel = require('../../Models/orderProduct');
const productModel = require('../../Models/product');
const generateUniqueId = require('generate-unique-id');

const addToOrderProduct = (req, res) => {
    new orderProductModel({
        invoiceId:generateUniqueId(),  
        ...req.body
    })
        .save()
        .then((ordProdData)=>{
            req.body.products.forEach(ele => {
                var itemObject={
                prodName:ele.prodName,
                prodPrice:ele.prodPrice,
                prodColor:ele.prodColor,
                prodDetails:ele.prodDetails,
                prodImg:ele.prodImg
            }
            new orderProductModel(itemObject).save()
            });
            res.status(200).json({
                status:true,
                msg:"add to orderProduct successful",
                data:ordProdData
            })
        })
        .catch((err)=>{
            res.status(500).json({
                status:false,
                msg:"product not added to orderProduct",
                error:err
            })
        })
}

const viewOrderProduct = (req,res)=>{
    orderProductModel.aggregate([
        {
            $match:{
                userId:new mongoose.Types.ObjectId(req.body.userId),
                prodId:new mongoose.Types.ObjectId(req.body.prodId)
            }
        }
    ]).then((ordProdData)=>{
        res.status(200).json({
            status:true,
            msg:"view orderProduct successful",
            data:ordProdData
        })
    })
    .catch((err)=>{
        res.status(500).json({
            status:false,
            msg:"orderProduct not get ",
            error:err
        })
    })

}

module.exports={
    addToOrderProduct,
    viewOrderProduct
}