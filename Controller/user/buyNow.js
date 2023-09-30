const mongoose = require('mongoose');
const buyNowModel = require('../../Models/buyNow');

const addtoBuy = (req, res) => {
    new buyNowModel({
        ...req.body
    })
        .save()
        .then((buyData)=>{
            res.status(200).json({
                status:true,
                msg:"product successsfuly added to buyNow",
                data:buyData
            })
        })
        .catch((err)=>{
            res.status(500).json({
                status:false,
                msg:"product not found",
                error:err
            })
        })

}
const getBuyNow = (req,res)=>{
    buyNowModel.aggregate([
        {
            $match:{
                userId:new mongoose.Types.ObjectId(req.body.userId),
                prodId:new mongoose.Types.ObjectId(req.body.prodId)

            }
        }
    ]) .then((buyData)=>{

        res.status(200).json({
            status:true,
            msg:"buynow successsfuly get",
            data:buyData
        })
    })
    .catch((err)=>{
        res.status(500).json({
            status:false,
            msg:"buyNow not found",
            error:err
        })
    })
    
}



module.exports={
    addtoBuy,
    getBuyNow
}