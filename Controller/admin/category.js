const mongoose = require('mongoose');
const cat = require('../../Models/category')

const createCat = (req, res) => {
    new cat({
        ...req.body
    })
        .save()
        .then((catData) => {
            res.status(200).json({
                status: true,
                msg: "category created successfully",
                data: catData
            })
        })
        .catch((err) => {
            res.status(500).json({
                status: false,
                msg: "category not created",
                error: err
            })
        })

}

const getCat = (req, res) => {
    cat.aggregate([
        {
            $match: {
                isDeleted: false
            }
        },
        {
            $project: {
                status: 0,
                isDeleted: 0,
                createdOn: 0,
                updatedOn: 0
            }
        }


    ]).then((catData) => {
        res.status(200).json({
            status: true,
            msg: "category view successful",
            data: catData
        })
    }).catch((err) => {
        res.status(500).json({
            status: false,
            msg: "error while fetching category details",
            error: err
        })

    })

}

const updateCat = (req, res) => {
    cat.findOneAndUpdate(
        {
            _id: new mongoose.Types.ObjectId(req.params._id)
        },
        {
            $set: {
                ...req.body
            }
        }
    ).then((catData) => {
        res.status(200).json({
            status: true,
            msg: "category update successful",
            data: catData
        })
    }).catch((err) => {
        res.status(500).json({
            status: false,
            msg: "category not found",
            error: err
        })
    })



}

const deleteCat = (req, res) => {
   cat.findOneAndDelete(
    {
        _id:new mongoose.Types.ObjectId(req.params._id)

    }
   ).then((catData)=>{
    res.status(200).json({
        status:true,
        msg:"category delete successful",
        data:catData
    })
   }).catch((err)=>{
    res.status(500).json({
        status:false,
        msg:"category not found",
        error:err
    })
   })

}

module.exports = {
    createCat,
    getCat,
    updateCat,
    deleteCat


}