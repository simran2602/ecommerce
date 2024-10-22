const mongoose = require('mongoose');
const cart = require('../../Models/cart');

const addToCart = (req, res) => {
    new cart({
        ...req.body
    })
        .save()
        .then((cartData) => {
            res.status(200).json({
                status: true,
                msg: "product added to cart successfully",
                data: cartData
            })
        }).catch((err) => {
            res.status(500).json({
                status: false,
                msg: "product not added to cart",
                error: err
            })
        })

}

const getCart = (req,res)=>{
    cart.aggregate([              
        
        {
            $match:{
                userId:new mongoose.Types.ObjectId(req.user._id)
                // prodId:new mongoose.Types.ObjectId
            }
        },
        {
            $lookup:{
                from:"products",
                foreignField:"_id",
                localField:"prodId",
                as:"product",
                pipeline:[
                    {
                        $lookup:{
                            from:"categories",
                            foreignField:"_id",
                            localField:"catId",
                            as:"category"
                        }
                    },
                    {
                        $unwind:"$category"
                    },
                    {
                        $addFields:{
                            category:"$category.catName"

                        }
                    },
                    {
                        $lookup:{
                            from:"subcats",
                            foreignField:"_id",
                            localField:"subCatId",
                            as:"subCategory"
                        }
                    },
                    {
                        $unwind:"$subCategory"
                    },
                    {
                        $addFields:{
                            subCategory:"$subCategory.name"

                        }
                    },
                    {
                        $project:{
                            _id:0,
                            catId:0,
                            subCatId:0,
                            stock:0,
                            status:0,
                            isDeleted:0,
                            __v:0,
                            prodColor:0,
                            createdOn:0
                        }
                    }
                ]
            }
        },
        {
            $unwind:"$product"
        },
        {
            $project:{
                prodId:0,
                userId:0,
                status:0,
                isDeleted:0,
                updatedOn:0,
                __v:0
            }
        },
        

        
    ]).then((cartData) => {
        console.log("cartData",cartData)
        res.status(200).json({
            status: true,
            msg: "get cart successful",
            data: cartData
        })
    }).catch((err) => {
        res.status(500).json({
            status: false,
            msg: "cart not found",
            error: err
        })
    })


}

const updateCart=async (req,res)=>{
   await  cart.findOneAndUpdate(
        {
            _id: new mongoose.Types.ObjectId(req.user._id)
        },
        {
          $set:{
            ...req.body
          }
        }
    ).then((cartData) => {
        // console.log("cartData",cartData)
        res.status(200).json({
            // console.log("cartData",cartData)
            status: true,
            msg: "update cart successfully",
            data: cartData
        })
    }).catch((err) => {
        res.status(500).json({
            status: false,
            msg: "cart not updated",
            error: err
        })
    })

}

const deleteCart = async (req,res)=>{
    await cart.findOneAndDelete(
        {
            _id:new mongoose.Types.ObjectId(req.params.id)
        }
    ).then((cartData) => {
        console.log("cartData",cartData)
        res.status(200).json({
            status: true,
            msg: "delete cart successfully",
            data: cartData
        })
    }).catch((err) => {
        res.status(500).json({
            status: false,
            msg: "cart not deleted",
            error: err
        })
    })

}

module.exports = {
    addToCart,
    getCart,
    updateCart,
    deleteCart
}
