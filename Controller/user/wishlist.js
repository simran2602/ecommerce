const mongoose = require('mongoose');
const wishlistModel = require('../../Models/wishlist');

const addToWishlist = (req,res)=>{
    wishlistModel.aggregate([
        {
            $match:{
                userId:new mongoose.Types.ObjectId(req.user._id),
                prodId:new mongoose.Types.ObjectId(req.body.prodId)
            }
        }
    ]).then((Data)=>{
        if(Data.length==0){
            new wishlistModel({
                userId:req.user._id,
                ...req.body
            }).save()
            .then((wishlistData)=>{
                res.status(200).json({
                    status:true,
                    msg:"product is successfully wishlisted",
                    data:wishlistData
                })
            }).catch((err)=>{
                res.status(500).json({
                    status:false,
                    msg:"server error !!",
                    error:err
                })
            })
        }else{
            wishlistModel.deleteOne(
                {
                    userId:new mongoose.Types.ObjectId(req.user._id),
                    prodId:new mongoose.Types.ObjectId(req.body.prodId)
                }
            ).then((wishlistData)=>{
                res.status(200).json({
                    status:true,
                    msg:"product is already wishlisted",
                
                })
            }).catch((err)=>{
                res.status(500).json({
                    status:false,
                    msg:"server error !!",
                    error:err
                })
            })
        }
    }).catch((err)=>{
        res.status(500).json({
            status:false,
            msg:"server error !!",
            error:err
        })

    })
}

module.exports ={
    addToWishlist
}