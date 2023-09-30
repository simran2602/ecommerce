const mongoose = require('mongoose');
const productModel = require('../../Models/product');

const getProd = (req, res) => {
    productModel.aggregate([
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
                as: "itemDetails",
                pipeline: [
                    {
                        $project: {
                            prodId: 0,
                            status: 0,
                            isDeleted: 0,
                            createdOn: 0,
                            __v: 0
                        }
                    }
                ]
            }
        },
        {
            $project: {
                catId: 0,
                subCatId: 0,
                stock: 0,
                status: 0,
                isDeleted: 0,
                createdOn: 0,
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

const searchProd = (req, res) => {
    // var val = req.prodName
    productModel.aggregate([
        {
            $match: {
                prodName: { $regex: req.body.prodName }
            }
        },
        {
            $lookup: {
                from: "itemdetails",
                foreignField: "prodId",
                localField: "_id",
                as: "itemDetails",
                pipeline: [
                    {
                        $project: {
                            prodId: 0,
                            status: 0,
                            isDeleted: 0,
                            createdOn: 0,
                            __v: 0
                        }
                    }
                ]
            }
        },

        {
            $project: {
                catId: 0,
                subCatId: 0,
                stock: 0,
                status: 0,
                isDeleted: 0,
                createdOn: 0,
                __v: 0
            }
        }
    ]).then((prodData) => {

        res.status(200).json({
            status: true,
            msg: "product search successful",
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

const getProdByCat = (req, res) => {
    productModel.aggregate([
        {
            $lookup: {
                from: "categories",
                foreignField: "_id",
                localField: "catId",
                as: "cat",
                pipeline: [
                    {
                        $project: {
                            status: 0,
                            isDeleted: 0,
                            createdOn: 0,
                            __v: 0
                        }


                    }
                ]
            }
        },
        {
            $unwind: "$cat"
        },
        

    ]).then((prodData) => {
        res.status(200).json({
            status: true,
            msg: "product get by cat successfully",
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

const getProdBySubCat = (req, res) => {
    productModel.aggregate([
        {
            $lookup: {
                from: "categories",
                foreignField: "_id",
                localField: "catId",
                as: "cat",
                pipeline: [

                    {
                        $project: {
                            status: 0,
                            isDeleted: 0,
                            createdOn: 0,
                            __v: 0
                        }


                    }
                ]
            }
        },
        {
            $lookup:{
                from:"subcats",
                foreignField:"_id",
                localField:"subCatId",
                as:"subCat",
                pipeline: [

                    {
                        $project: {
                            status: 0,
                            isDeleted: 0,
                            createdOn: 0,
                            __v: 0
                        }


                    }
                ]

            }
        },
        {
            $unwind:"$subCat"
        },
      

        {
            $unwind: "$cat"
        },
        {
            $project: {
                catId: 0,
                subCatId: 0,
                stock: 0,
                status: 0,
                isDeleted: 0,
                createdOn: 0,
                __v: 0
            }
        }

    ]).then((prodData) => {
        res.status(200).json({
            status: true,
            msg: "product get by subCat successfully",
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


module.exports = {
    getProd,
    searchProd,
    getProdByCat,
    getProdBySubCat
}