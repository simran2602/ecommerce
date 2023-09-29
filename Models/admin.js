const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    image:{
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
        type:Date
    },
    updatedOn:{
        type:Date,
        default:new Date()
    }
})

module.exports = mongoose.model("admin",adminSchema)