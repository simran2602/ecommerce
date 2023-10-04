const mongoose = require('mongoose');
const orderDeatilsSchema = new mongoose.Schema({      
    userId:{
        type:mongoose.Schema.Types.ObjectId
    },
    invoiceId:{
        type:String
    },
    userAddress:{
        type:String
    },
    paymentMode:{
        type:String
    },
    totalPrice:{
        type:Number
    },    
    isDeleted:{
        type:Boolean,
        default:false
    },    
    createdOn:{
        type:Date,
        default:new Date()
    }
    
    
})

module.exports = mongoose.model("orderDeatils",orderDeatilsSchema);