const users = require("../models/user");
const handleError = require("../middleware/handleError");
const queue = require("bull");
const envs = require("../config/env/index");
const processMailQueue = require("../helpers/processMailQueue");

class mailController {

  static emailQueue = new queue('emailQueue',{
    redis:{
      host: '127.0.0.1',  // or your Redis container/service IP
      port: 6379
    }
  });

  
  
  
  static sendCodeToUsers = async (req, res, next) => {

    try{

      console.log('Queue name:', this.emailQueue.name);
console.log('Redis client status:', this.emailQueue.client?.status);
console.log('Redis is ready?', this.emailQueue.client?.status === 'ready');
      const userDetails = await users.find();
      console.log(userDetails);
      
      for (const user of userDetails) {
        console.log('Adding job for:', user.email); // Check this prints
        await this.emailQueue.add({
          email: user.email,
          name: user.name
        });
      }
      this.emailQueue.count().then(count => {
  console.log('📬 Jobs in queue:', count);
});
      
      await processMailQueue();
      res.status(200).send({"status":"succsess","message":"Get user details","result":""});
    }
    catch(err){
      next(err);
    }
  };
}

module.exports = mailController;