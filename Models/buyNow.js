const mongoose = require('mongoose');
const buyNowSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId
    },
    prodId:{
        type: mongoose.Schema.Types.ObjectId
    },
    prodImg:{
        type:String
    },
    prodDetails:{
        type:String
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

module.exports = mongoose.model("buyNow",buyNowSchema);