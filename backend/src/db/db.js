const mongoose = require("mongoose");

const connectDb = () => {
  mongoose.connect('mongodb://127.0.0.1:27017/food-view', {

  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });
};

module.exports = connectDb;
