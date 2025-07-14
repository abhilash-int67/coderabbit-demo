const mongoose = require("mongoose");
const validator = require("validator");

const productSchema = mongoose.Schema({
    sku_code : {
        type: String,
        required: true
    },
    name : {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    variants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'productVariant'
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

const Product = mongoose.model("Product",productSchema);

// async function validateEmail(email) {
//     if (!validator.isEmail(email)) {
//         throw new Error("Please enter a valid email address.")
//     }
//     const user = await User.findOne({ email })
//     if (user) 
//     {
//         throw new Error("A user is already registered with this email address.")
//     }
//   }

  module.exports = Product;