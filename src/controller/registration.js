const users = require("../models/user");
const envs = require("../config/env/index");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const handleError = require("../middleware/handleError");

const registration = async (req, res, next) => {

  try{

    const userData = new users({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, envs.passwordSalt)
    });

    const userSave = await userData.save();
    
    //Create token
    const token = jwt.sign({id:userSave._id},envs.jwt.accessToken.secret,{ expiresIn: envs.jwt.accessToken.expiry });
  
    res.status(200).json({"status":"success","message":"Registered Successfully","token":token});
  }
  catch(err){
    next(err);
  }

};

module.exports = registration;