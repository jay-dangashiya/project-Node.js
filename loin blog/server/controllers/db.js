const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "blogApp", // optional DB name
    });

    console.log(` MongoDB Connected: ${conn.connection.host}`);

  } catch (error) {
    console.error(" MongoDB Connection Failed:", error.message);

    // Exit process if DB fails
    process.exit(1);
  }
};

module.exports = connectDB;