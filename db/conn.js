// Conection File for monogo atlas.//

import mongoose from "mongoose";

const connectDB = async () => {
  console.log("Please Wait for connect to Data Base....");
  try {
    const conn = await mongoose.connect(process.env.MONGOATLAS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // console.log(`MongoDB connected: ${conn.connection.user}`);
    console.log("Connected to the server...");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
