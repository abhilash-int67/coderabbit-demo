const mongoose = require("mongoose");
const users = require("./user");

const userInfoSchema = mongoose.Schema({
    profile_image : {
        type: String,
        image: Buffer,
        required: true
    },
    image_name:{
        type: String,
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

module.exports = mongoose.model("UserInfo",userInfoSchema);