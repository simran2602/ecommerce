const mongoose = require('mongoose');
const itemDetailsSchema = new mongoose.Schema({
    prodId:{
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
    status: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdOn: {
        type: Date,
        default: new Date()
    },
    updatedOn: {
        type: Date
    }
})

module.exports= mongoose.model("itemDetail",itemDetailsSchema);