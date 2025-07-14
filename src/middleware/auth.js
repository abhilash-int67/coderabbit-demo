const jwt = require("jsonwebtoken");
const envs = require("../config/env/index");
const users = require("../models/user");
const userInfoModel = require("../models/userInfo");

const checkUserAuth = async (req,res,next) => {

    try{
        
        const bearer_token = req.header("bearer-token");

        const userId =  jwt.verify(bearer_token,envs.jwt.accessToken.secret);

        req.userData = await users.findById(userId.id).populate('userInfos').exec();
        //req.userData = await users.find().populate('userInfos').exec();

        next();
    }
    catch(err){

        next(err);

    }
    
}

module.exports = checkUserAuth;
