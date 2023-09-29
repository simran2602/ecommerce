const mongoose = require('mongoose');
const product = require('../../Models/product');
const itemDetailsModel = require('../../Models/itemDetails');

const addProd = (req, res) => {
    new product(
        {
            ...req.body,

        }
    )
        .save()
        .then((prodData) => {

            req.body.itemDetails.forEach(element => {
                console.log("ele", element)
                var itemObject = {
                    prodId: prodData._id,
                    itemSize: element.itemSize,
                    itemPrice: element.itemPrice,
                    itemColor: element.itemColor
                }

                new itemDetailsModel(itemObject).save()
            });

            res.status(200).json({
                status: true,
                msg: "product added successfully",
                data: prodData
            })
        }).catch((err) => {
            res.status(500).json({
                status: false,
                msg: "product not added",
                error: err
            })
        })


}

const getProd = (req, res) => {
    product.aggregate([
        {
            $match: {
                isDeleted: false
            }
        },
        {
            $lookup: {
                from: "itemdetails",
                foreignField: "prodId",
                localField: "_id",
                as: "itemDetails"
            }
        },
        {
            $project: {
                stock: 0,
                status: 0,
                isDeleted: 0,
                createdOn: 0,
                updatedOn: 0,
                __v: 0
            }
        }
    ]).then((prodData) => {
        res.status(200).json({
            status: true,
            msg: "product get successfully",
            data: prodData
        })
    }).catch((err) => {
        res.status(500).json({
            status: false,
            msg: "product not found",
            error: err
        })
    })


}

const updateProd = (req, res) => {
    product.findOneAndUpdate(
        {
            _id: new mongoose.Types.ObjectId(req.params.id)
        },
        {
            $set: {
                ...req.body
            }
        }
    ).then((prodData) => {
        itemDetailsModel.deleteMany(
            {
                prodId: product._id
            }
        )

        req.body.itemDetails.forEach(ele => {
            console.log(ele)
            var itemObject = {
                prodId: product._id,
                itemSize: ele.itemSize,
                itemPrice: ele.itemPrice,
                itemColor: ele.itemColor
            }
            new itemDetailsModel(itemObject).save()

        })


        res.status(200).json({
            status: true,
            msg: "product update successfully",
            data: prodData
        })
    }).catch((err) => {
        res.status(500).json({
            status: false,
            msg: "product not found",
            error: err.message
        })
    })

}

const deleteProd = (req, res) => {
    product.findOneAndDelete(
        {
            _id: new mongoose.Types.ObjectId(req.params.id)
        }
    ).then((prodData) => {
        itemDetailsModel.deleteMany(
            {
                prodId: new mongoose.Types.ObjectId(req.params.id)
            }

        ).then((data) => {
            console.log("data", data)
        }).catch((error) => {
            console.log("error", error)
        })

        res.status(200).json({
            status: true,
            msg: "product deleted successfully",
            data: prodData
        })
    }).catch((err) => {
        res.status(500).json({
            status: false,
            msg: "product not found",
            error: err.message
        })
    })

}

module.exports = {
    addProd,
    getProd,
    updateProd,
    deleteProd
}