const schedule = require('node-schedule');
const users = require("../models/user");
const handleError = require("../middleware/handleError");
const queue = require("bull");
const envs = require("../config/env/index");
const processMailQueue = require("./processMailQueue");

const emailQueue = new queue('emailQueue',{
  redis:{
    port: envs.REDIS_PORT,
    host: envs.REDIS_URI
  }
});

const mailSendingTime = new Date((new Date("2023-08-04T06:33:00.734+00:00")).getTime() - (10*60*1000));

//console.log(mailSendingTime);

const job = schedule.scheduleJob( mailSendingTime, async ()=> {
  const userDetails = await users.find();
      for (const users of userDetails) {
        const addToEmailQueue =  emailQueue.add(users);
      }
      await processMailQueue();
      console.log('The world is going to end today.');
});



module.exports = job;