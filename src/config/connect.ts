import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connect = async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
    };
    // connect you DB here
    await mongoose.connect(process.env.DATABASE_URL as string, options);
    console.log("Database connected successfully");
  } catch (err: any) {
    console.log(err.toString());
  }
};
