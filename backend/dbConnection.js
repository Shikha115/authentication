const mongoose = require("mongoose");

const dbConnection = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("Connected to Mongo");
  } catch (err) {
    console.error("Couldn't connect to Mongo:", err);
  }
};

module.exports = dbConnection;
