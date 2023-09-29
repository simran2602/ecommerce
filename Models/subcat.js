const mongoose = require('mongoose');

const subcatSchema = new mongoose.Schema({
    catId:{
        type:mongoose.Schema.Types.ObjectId
    },
    name:{
        type:String
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
        type:Date,
        default:new Date()
    },
    updatedOn:{
        type:Date,
    }
})

module.exports = mongoose.model("subcat",subcatSchema);