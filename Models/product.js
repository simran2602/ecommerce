const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    catId: {
        type: mongoose.Schema.Types.ObjectId
    },
    subCatId: {
        type: mongoose.Schema.Types.ObjectId
    },
    prodName: {
        type: String
    },
    prodPrice: {
        type: Number
    },
    disPrice: {
        type: Number
    },
    prodColor: {
        type: String
    },
    prodDetails: {
        type: String
    },   
    prodImg: {
        type: String
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
        type: Date,
    }
})

module.exports = mongoose.model("product",productSchema);
