const mongoose = require("mongoose");
const validator = require("validator");

const productImageSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    image: {
        type: String,
        image: Buffer,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})

const productImage = mongoose.model("ProductImage",productImageSchema);

module.exports = productImage;