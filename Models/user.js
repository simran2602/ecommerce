const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    phone:{
        type:Number
    },
    address:{
        type:String
    },
    token:{
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

module.exports = mongoose.model("user",userSchema);