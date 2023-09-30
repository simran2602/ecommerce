const mongoose = require('mongoose');
const orderDeatilsSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId
    },
    invoiceId:{
        type:String
    },
    userAdd:{
        type:String
    },
    paymentMode:{
        type:String
    },
    totalPrice:{
        type:Number
    },
    status:{
        type:Boolean,
        default:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }, status:{
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
    },
    createdOn:{
        type:Date
    },
    updatedOn:{
        type:Date,
        default:new Date()
    }
})

module.exports = mongoose.model("orderDeatils",orderDeatilsSchema);