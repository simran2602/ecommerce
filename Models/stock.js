const mongoose = require('mongoose');
const stockSchema = new mongoose.Schema({
    prodId:{
        type:mongoose.Schema.Types.ObjectId
    },
    prodQty:{
        type:Number
    },
    itemDetails:{
        type:Object
    },
    createdOn:{
        type:Date,
        default:new Date()
    }

})

module.exports = mongoose.model("stock",stockSchema);