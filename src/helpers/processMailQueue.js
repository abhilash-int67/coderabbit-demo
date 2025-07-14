const handleError = require("../middleware/handleError");
const queue = require("bull");
const nodemailer = require("nodemailer");
const envs = require("../config/env/index");


const process = async(res,next) => {
    
  const emailQueue = new queue('emailQueue',{
    redis:{
      port: envs.REDIS_PORT,
      host: envs.REDIS_URI
    }
  });
  const processEmailQueue = async (job) => {
    //const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'linnie.hermiston@ethereal.email',
      pass: 'ChvNcKe3VEZhSPh8RQ'
    },
    tls: {
        rejectUnauthorized: false,
      }
    });
    const to = job.data.email;

   //console.log("Sending mail to %s", to);

  let info = await transporter.sendMail({
    from:"wyman68@ethereal.email",
    to: to,
    subject:"Discount on Products",
    html: `<strong>Dear `+job.data.name.first+` `+job.data.name.last+`</strong><br><br>We hope this letter finds you well. As a valued customer of company, we wanted to extend a special offer to you. For a limited time, we are offering a 20% discount on all of our products<br><br><br><br>Thanks & Regards<br><br> Abc Org.`,
  });

  
  //console.log("Message sent: %s", info);
   // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    //console.log("Message sent: %s", job.data);

   // next();
  };

  emailQueue.process(processEmailQueue);
  emailQueue.on('completed',(job)=>{
    console.log("Job_id",job.id);
  })
}

module.exports = process;