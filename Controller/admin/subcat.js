const mongoose = require('mongoose');
const subCat = require('../../Models/subcat');

const createSubCat = (req, res) => {
    new subCat(
        {
            ...req.body
        })
        .save()
        .then((subCatData) => {
            res.status(200).json({
                status: true,
                msg: "sub category created successful",
                data: subCatData
            })
        }).catch((err) => {
            res.status(500).json({
                status: false,
                msg: "subCategory not created",
                error: err
            })
        })

}

const getSubCat = (req, res) => {
    subCat.aggregate([
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
    ]).then((subCatData) => {
        res.status(200).json({
            status: true,
            msg: "subCategory get successful",
            data: subCatData
        })
    }).catch((err) => {
        res.status(500).json({
            status: false,
            msg: "subcategory not found",
            error: err
        })
    })
}

const updateSubCat = (req, res) => {
    subCat.findOneAndUpdate(
        {
            _id: new mongoose.Types.ObjectId(req.params._id)
        },
        {
            $set: {
                ...req.body
            }
        }
    ).then((subCatData)=>{
        res.status(200).json({
            status:true,
            msg:"subCategory update successful",
            data:subCatData
        })
    }).catch((err)=>{
        res.status(500).json({
            status:false,
            msg:"subCategory not found",
            error:err
        })
    })
}

const deleteSubCat=(req,res)=>{
    subCat.findOneAndDelete(
        {
            _id:new mongoose.Types.ObjectId(req.params._id)
        }
    ).then((subCatData)=>{
        res.status(200).json({
            status:true,
            msg:"subCategory delete successful",
            data:subCatData
        })
    }).catch((err)=>{
        res.status(500).json({
            status:false,
            msg:"subCategory not found",
            error:err
        })
    })
}



module.exports = {
    createSubCat,
    getSubCat,
    updateSubCat,
    deleteSubCat
}