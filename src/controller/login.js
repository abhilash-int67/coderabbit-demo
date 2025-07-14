const users = require("../models/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const envs = require("../config/env/index");
const handleError = require("../middleware/handleError");
const cluster = require('cluster');

const login = async (req, res, next) => {

  try{

    console.log(`Process ID: ${process.pid}`);

    const email = req.body.email;
    const password = req.body.password;

    const condition = {
      email: email
    };

    const userData = await users.findOne(condition);

    if(userData){

      // for (let index = 0; index < 100000; index++) {
      //   console.log("test");
        
      // }
      
        // password compare process
        const isSame = await bcrypt.compare(password, userData.password);

        if (isSame) {

          const token = jwt.sign({id:userData._id},envs.jwt.accessToken.secret,{ expiresIn: envs.jwt.accessToken.expiry });

          res.status(200).json({"status":"success","message":"Logged In Successfully","token":token, "processid":process.pid, "cluster.worker.id":cluster.worker.id});
          
        }
        else
        {
          await handleError({message:"Invalid Password",statusCode:403},req,res,next);
        }

    }
    else{
      await handleError({message:"Invalid Email",statusCode:403},req,res,next);
    }
  }
  catch(err){
    next(err);
  }
};

module.exports = login;