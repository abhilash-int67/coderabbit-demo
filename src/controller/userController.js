const users = require("../models/user");
const userInfoModel = require("../models/userInfo");
const handleError = require("../middleware/handleError");

class userController {

  static userData = async (req, res, next) => {

    try{
      const userDetails = req.userData;
      res.status(200).send({"status":"succsess","message":"Get user details","result":userDetails});
    }
    catch(err){
      next(err);
    }
  };

  static userInfo = async (req, res, next) => {

    try{

      let string = req.body.profile_image;

      var bindata = new Buffer.from(string.split(",")[1], 'binary').toString('base64');

      const userInfo = new userInfoModel({
        profile_image:  bindata.toString(),
        image_name: req.body.image_name,
      });
    
      const userInfoSave = await userInfo.save()
     
      if (userInfoSave) {

        const userUpdate = await users.findByIdAndUpdate(req.userData._id, {$push: {userInfos: userInfoSave._id} } );
        
        if(userUpdate){

          res.status(200).send({"status":"succsess","message":"User Info Added"});
     
        }
        else{
          await handleError({message:"User info not updated to user collection",statusCode:500},req,res,next);
        }
      }
      else{
        await handleError({message:"User info not added",statusCode:500},req,res,next);
      }
      
     
    }
    catch(err){
      next(err);
    }
  };
}

module.exports = userController;