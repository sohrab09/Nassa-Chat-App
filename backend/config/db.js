const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {

  const MONGO_URI = `mongodb+srv://admin:admin@cluster0.fblo0.mongodb.net/?retryWrites=true&w=majority`

  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`.green.underline);
  } catch (error) {
    console.log(`Error: ${error.message}`.red.bold);
    process.exit();
  }
};

module.exports = connectDB;
