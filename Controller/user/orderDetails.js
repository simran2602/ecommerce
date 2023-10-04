const mongoose = require('mongoose');
const orderDeatilsModel = require('../../Models/orderDetails');
const orderProductModel = require('../../Models/orderProduct');

const checkOut = (req, res) => {

    let invoiceID = Math.floor(Math.random()*1000000000000)
    
    const checkOutObjct = {
        userId: new mongoose.Types.ObjectId(req.user._id),
        invoiceId: invoiceID ,// gen invoice ID
        userAddress: req.body.userAddress,
        paymentMode: req.body.paymentMode,
        totalPrice: req.body.totalPrice,    

    }

    new orderDeatilsModel(checkOutObjct).save()
    .then((data)=>{
        req.body.produtDetails.forEach(element => {
            console.log("element",element)
            let productItem ={
                orderId: data._id,
                userId: new mongoose.Types.ObjectId(req.user._id),
                prodId: element.prodId,
                invoiceId: data.invoiceId,
                prodName: element.prodName,
                itemDetails: element.itemDetails,
                prodQty: element.prodQty
            }

            new orderProductModel(productItem).save()

        });
        res.status(200).json({
            status:true,
            msg:"ordere successfully",
            ordData:data
        })
        

    }).catch((err)=>{
        res.status(500).json({
            status: false,
            msg: 'Server error !!'
        })
    })

}

module.exports = {
    checkOut

}
