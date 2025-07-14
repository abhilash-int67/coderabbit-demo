const mongoose = require("mongoose");
const envs = require("../env/index");

/**
 * This function is used for connecting database
 */

let connectionString = '';

if (envs.db.username && envs.db.password) {
  connectionString = `mongodb+srv://${envs.db.username}:${envs.db.password}@${envs.db.host}/${envs.db.database}?retryWrites=true&w=majority`;
} else {
  connectionString = "mongodb://mongodb:27017/node-db"; // ✅ Fixed here
}

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDB = () => {
  return mongoose.connect(connectionString, options);
};

module.exports = connectDB;
