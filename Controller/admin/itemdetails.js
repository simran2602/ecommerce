const mongoose = require('mongoose');
const itemDetail = require('../../Models/itemDetails');

const addItemDetails = (req, res) => {
    new itemDetail(
        {
            ...req.body
        }
    )
        .save()
        .then((itemData) => {
            res.status(200).json({
                status: true,
                msg: "item data added successfully",
                data: itemData
            })
        }).catch((err) => {
            res.status(500).json({
                status: false,
                msg: "item data not added",
                error: err
            })
        })

}

const getItemDetails = (req, res) => {
    itemDetail.aggregate([
        {
            $match: {
                isDeleted: false
            }
        },
        {
            $project: {
                //stock:0,
                status: 0,
                isDeleted: 0,
                createdOn: 0,
                updatedOn: 0
            }
        }
    ]).then((itemData) => {
        res.status(200).json({
            status: true,
            msg: "item data get successfully",
            data: itemData
        })
    }).catch((err) => {
        res.status(500).json({
            status: false,
            msg: "item data not added",
            error: err
        })
    })
}

const updateItemDetails = (req, res) => {
    itemDetail.findOneAndUpdate(
        {
            _id: new mongoose.Types.ObjectId(req.params._id)
        },
        {
            $set: {
                ...req.body
            }
        }
    ).then((itemData) => {
        res.status(200).json({
            status: true,
            msg: "item data updated successfully",
            data: itemData
        })
    }).catch((err) => {
        res.status(500).json({
            status: false,
            msg: "item data not added",
            error: err
        })
    })
}
const deleteItemDetails = (req, res) => {
    itemDetail.findOneAndDelete(
        {
            _id: new mongoose.Types.ObjectId(req.params.id)
        }
    ).then((itemData) => {
        res.status(200).json({
            status: true,
            msg: "item data deleted successfully",
            data: itemData
        })
    }).catch((err) => {
        res.status(500).json({
            status: false,
            msg: "item data not added",
            error: err
        })
    })

}



module.exports = {
    addItemDetails,
    getItemDetails,
    updateItemDetails,
    deleteItemDetails
}



