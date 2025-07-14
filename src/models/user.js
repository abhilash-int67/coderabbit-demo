const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
    userInfos : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserInfo'
    }],
    name : {
        type: Object,
        required: true
    },
    email:{
        type: String,
        required: true,
        validate: validateEmail
    },
    password: {
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

const User = mongoose.model("User",userSchema);

async function validateEmail(email) {
    if (!validator.isEmail(email)) {
        throw new Error("Please enter a valid email address.")
    }
    const user = await User.findOne({ email })
    if (user) 
    {
        throw new Error("A user is already registered with this email address.")
    }
  }

  module.exports = User;