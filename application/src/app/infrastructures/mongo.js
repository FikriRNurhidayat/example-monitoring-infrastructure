const mongoose = require("mongoose");
const config = require("../config");

module.exports = {
  start() {
    mongoose.set("strictQuery", false);
    return mongoose.connect(
      config.database.url || "mongodb://localhost:27017/example"
    );
  },
};
