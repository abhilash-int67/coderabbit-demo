const jwt = require("jsonwebtoken");
const envs = require("../config/env/index");
const users = require("../models/user");
const handleError = require("./handleError");

const validateApi = async (req,res,next) => {

    try{
        const api_key = req.header("api-key");
        if (api_key) {
            if (envs.apiKey == api_key) {
                next();
            }
            else
            {
                await handleError({message:"API key is incorrect",statusCode:403},req,res,next);
            }
        }
        else
        {
            await handleError({message:"API key is not found",statusCode:403},req,res,next);
        }
          
    }
    catch(err){

        next(err);

    }
    
}

module.exports = validateApi;
