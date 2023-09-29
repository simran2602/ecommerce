const mongoose=require('mongoose');

const categorySchema = new mongoose.Schema({
    catName:{
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

module.exports= mongoose.model("category",categorySchema);