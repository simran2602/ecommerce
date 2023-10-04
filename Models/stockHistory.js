const mongoose = require('mongoose');

const stockHistorySchema = new mongoose.Schema({
    orderId:{
        type:mongoose.Schema.Types.ObjectId
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId
    },
    prodId:{
        type:mongoose.Schema.Types.ObjectId
    },
    itemDetails:{
        type:Object
    },
    quantity:{
        type:Number
    },
    createdOn:{
        type:Date,
        default:new Date()
    }
})

module.exports = mongoose.model("stockHistory",stockHistorySchema);