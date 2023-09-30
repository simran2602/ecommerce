const mongoose = require('mongoose');
// const crypto = require(crypto);
// const invoiceId = crypto.randomUUID();
const orderProductSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId
    },
    
    invoiceId:{
        type:Number
    },
    prodName:{
        type:String
    },
    prodImg:{
        type:String
    },
    prodDetails:{
        type:String
    },
    prodQty:{
        type:Number
    },
    prodPrice:{
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
module.exports = mongoose.model("orderProduct",orderProductSchema);