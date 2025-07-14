const express = require("express");
const bodyParser = require('body-parser')
//const swaggerJsDoc = require("swagger-js-doc"); 
const swaggerUiExpress = require("swagger-ui-express");
const swaggerDocument = require('./swagger.json');
const connectDB = require("./config/database/mongo");
const envs = require("./config/env/index");
const route = require("./route/index");
const saleScheduling = require("./helpers/saleScheduling");
const cors = require('cors');
const moment = require('moment');
const cluster = require('cluster');
const os = require('os');
const { log } = require("console");
//const processMailQueue = require("./helpers/processMailQueue");


const app = express();

app.use(cors({
    origin: '*'
}));

//app.use(moment);

app.use(express.json({ limit: "50mb" }));

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))

app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocument));

app.use("/api",route);

const DBConnection = async () => {
  try{
   await connectDB();
   await app.listen(envs.port, () =>  console.log(`Express server listening on port ${envs.port}`));
  }
  catch(error){
    console.log(error);
  }
}
DBConnection();

module.exports = app;

//console.log(saleScheduling);
// const totalCpus = os.cpus().length;

// if (cluster.isPrimary) {
//   console.log(`Primary ${process.pid} is running`);

//   // Fork workers.
//   for (let i = 0; i < totalCpus; i++) {
//     console.log(totalCpus);
//     cluster.fork();
//   }

//   // cluster.on('exit', (worker, code, signal) => {
//   //   console.log(`worker ${worker.process.pid} died`);
//   // });
// } else {

//   // app.get('/', (req, res) => {
//   //   res.send(`Hello from process ${process.pid}`);
//   // });
//   // app.use("/api",route);

//   // console.log(`Secondary ${process.pid} is running`);

 

// }


// const express = require("express");
// const bodyParser = require('body-parser')
// //const swaggerJsDoc = require("swagger-js-doc"); 
// const swaggerUiExpress = require("swagger-ui-express");
// const swaggerDocument = require('./swagger.json');
// const connectDB = require("./config/database/mongo");
// const envs = require("./config/env/index");
// const route = require("./route/index");
// const cors = require('cors')

// const app = express();

// app.use(cors({
//     origin: '*'
// }));

// app.use(express.json());

// app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocument));

// app.use("/api",route);

// const DBConnection = async () => {
//   try{
//    await connectDB();
//    await app.listen(envs.port, () =>  console.log(`Express server listening on port ${envs.port}`));
//   }
//   catch(error){
//     console.log(error);
//   }
// }
// DBConnection();

// module.exports = app;