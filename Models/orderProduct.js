const mongoose = require('mongoose');
const orderProductSchema = new mongoose.Schema({
    orderId:{
        type:mongoose.Schema.Types.ObjectId
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId
    },
    prodId:{
        type:mongoose.Schema.Types.ObjectId
    },    
    invoiceId:{
        type:Number
    },
    prodName:{
        type:String
    },
    itemDetails:{
        type:Object
    },     
    prodQty:{
        type:Number
    },    
    orderStatus:{
        type:String,
        enum:['pending','shipped','cancelled','delivered']
    },    
    isDeleted:{
        type:Boolean,
        default:false
    },
    createdOn:{
        type:Date,
        default:new Date()
    },
   
})
module.exports = mongoose.model("orderProduct",orderProductSchema);