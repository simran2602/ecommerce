const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    prodId:{
        type:mongoose.Schema.Types.ObjectId
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId
    },
    itemSize:{
        type:String
    },
    itemColor:{
        type:String
    },
    itemPrice:{
        type:Number
    },
    prodQty:{
        type:Number
    },
    status:{
        type:Boolean,
        default:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    createdOn:{
        type:Date
    },
    updatedOn:{
        type:Date,
        default:new Date()
    }
})

module.exports = mongoose.model("cart",cartSchema)