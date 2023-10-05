const mongoose = require('mongoose');

const stockModel = require('../../Models/stock');



const addToStock = (req, res) => {
    stockModel.aggregate([
        {
            $match: {
                prodId: new mongoose.Types.ObjectId(req.params.id),
                itemColor: req.body.itemColor
            }
        }
    ]).then((data) => {
        console.log("data", data)
        if (data.length == 0) {
            new stockModel({
                ...req.body
            }).save()
                .then((stockData) => {
                    res.status(200).json({
                        status: true,
                        msg: "stock added successfully",
                        data: stockData
                    })
                }).catch((err) => {
                    res.status(500).json({
                        status: false,
                        msg: "server error !!",
                        error: err.message
                    })
                })
        } else {
            // let abc=  Number(data[0].itemQty) + Number(req.body.itemQty)
            // console.log("abc",abc)
            stockModel.findOneAndUpdate(
                {
                    prodId: new mongoose.Types.ObjectId(req.params.id),
                    itemColor: req.body.itemColor
                },
                {
                    $set: {
                        itemQty:  Number(data[0].itemQty) + Number(req.body.itemQty)
                        // ...req.body
                    }

                },{new:true}
            ).then((stockData) => {
                res.status(200).json({
                    status: true,
                    msg: "stock  quantity added successfully",
                    data: stockData
                })
            }).catch((err) => {
                console.log("err",err)
                res.status(500).json({
                    status: false,
                    msg: "server error !!",
                    error: err.message
                })
            })

        }
    })

}
const getStock = (req, res) => {
    stockModel.aggregate([
        {
            $match: {
                prodId: new mongoose.Types.ObjectId(req.params.id),//prodId
            }
        }
    ]).then((stockData) => {
        res.status(200).json({
            status: true,
            msg: "stock get successfully",
            data: stockData
        })
    }).catch((err) => {
        res.status(500).json({
            status: false,
            msg: "server error !!",
            error: err
        })
    })

}

const orderedItem = (req,res)=>{
    stockModel.aggregate([
        {
            $lookup:{
                from:"orderproducts",
                foreignField:"prodId",
                localField:"prodId",
                as:"orderPurchaseDetails"
            }
        }

    ]).then((stockData) => {
        res.status(200).json({
            status: true,
            msg: "ordered item get successfully",
            data: stockData
        })
    }).catch((err) => {
        res.status(500).json({
            status: false,
            msg: "server error !!",
            error: err
        })
    })

}

// const deleteStock = (req, res) => {

//         stockModel.findOneAndDelete(
//             {
//                 _id: new mongoose.Types.ObjectId(req.params.id)
//             }

//         ).then((stockData) => {
//             res.status(200).json({
//                 status: true,
//                 msg: "stock updated successfully",
//                 data: stockData
//             })
//         }).catch((err) => {
//             res.status(500).json({
//                 status: false,
//                 msg: "server error !!",
//                 error: err
//             })
//         })

//     }




module.exports = {
    addToStock, getStock,orderedItem
}