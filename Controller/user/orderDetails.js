const mongoose = require('mongoose');
const orderDeatilsModel = require('../../Models/orderDetails');
const orderProductModel = require('../../Models/orderProduct');
const stockModel = require('../../Models/stock');
const itemDetails = require('../../Models/itemDetails');
const stock = require('../../Models/stock');

const checkOut = (req, res) => {

    let invoiceID = Math.floor(Math.random() * 1000000000000)

    const checkOutObjct = {
        userId: new mongoose.Types.ObjectId(req.user._id),
        invoiceId: invoiceID,// gen invoice ID
        userAddress: req.body.userAddress,
        paymentMode: req.body.paymentMode,
        totalPrice: req.body.totalPrice,

    }

    new orderDeatilsModel(checkOutObjct).save()
        .then((data) => {
            req.body.produtDetails.forEach(element => {
                // console.log("element", element)
                let productItem = {
                    orderId: data._id,
                    userId: new mongoose.Types.ObjectId(req.user._id),
                    prodId: element.prodId,
                    invoiceId: data.invoiceId,
                    prodName: element.prodName,
                    itemDetails: element.itemDetails,
                    prodQty: element.prodQty                    
                }
                new orderProductModel(productItem).save()
                stockModel.aggregate([  
                    {
                        $match: {
                            prodId: new mongoose.Types.ObjectId(element.prodId),
                            itemColor: element.itemDetails.itemColor
                        }
                    },                 
                    {
                        $lookup: {
                            from: "orderproducts",
                            foreignField: "prodId",
                            localField: "prodId",
                            as: "orderProduct"
                        }
                    },
                    
                    {
                        $unwind: "$orderProduct"
                    },
                    // {
                    //     $addFields:{
                    //         prodQty:"$orderProduct.prodQty"

                    //     }
                    // },
                    {
                        $subtract: ["$itemQty", "orderProduct.$prodQty"]
                        // $set:{
                        //     itemQty:"$itemQty"-"$prodQty"
                        // }
                    }
                ])
                // .then((data) => {
                //     console.log("data", data)
                //     res.status(200).json({
                //         status:true,
                //         msg:"",
                //         data:data
                //     })
                // }).catch((err) => {
                //     res.status(500).json({
                //         status:false,
                //         msg: "server error !!",
                //         error:err
                //     })
                // })

            });

            res.status(200).json({
                status: true,
                msg: "order successfully",
                ordData: data
            })


        }).catch((err) => {
            res.status(500).json({
                status: false,
                msg: 'Server error !!',
                error: err.message
            })
        })

}

const getOrder = (req, res) => {
    orderDeatilsModel.aggregate([
        {
            $match: {
                userId: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup: {
                from: "orderproducts",
                foreignField: "orderId",
                localField: "_id",
                as: "products",
                pipeline: [
                    {
                        $project: {
                            _id: 0,
                            orderId: 0,
                            userId: 0,
                            prodId: 0,
                            invoiceId: 0,
                            isDeleted: 0,
                            __v: 0
                        }
                    }
                ]
            }
        },
        {
            $project: {
                isDeleted: 0,
                createdOn: 0,
                __v: 0
            }
        }
    ]).then((orderData) => {
        res.status(200).json({
            status: true,
            msg: "order view successful",
            data: orderData
        })
    }).catch((err) => {
        res.status(500).json({
            status: false,
            msg: "server error",
            error: err.message
        })
    })

}

module.exports = {
    checkOut,
    getOrder
}
