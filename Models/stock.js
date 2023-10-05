const mongoose = require('mongoose');
const stockSchema = new mongoose.Schema({
    prodId:{
        type:mongoose.Schema.Types.ObjectId
    },
    itemColor:{
        type:String
    },
    itemQty:{
        type:Number
    },    
    createdOn:{
        type:Date,
        default:new Date()
    }

})

module.exports = mongoose.model("stock",stockSchema);