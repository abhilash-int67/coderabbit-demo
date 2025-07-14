const mongoose = require("mongoose");
const validator = require("validator");

const productVariantSchema = mongoose.Schema({
    
    model_no:{
        type: String,
        required: true,
    },
    model_name:{
        type: String,
        required: true,
    },
    color:{
        type: String,
        required: true,
    },
    quantity:{
        type: Number,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    productImages : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductImage'
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})

const productVariant = mongoose.model("productVariant",productVariantSchema);

module.exports = productVariant;