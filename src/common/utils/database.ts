import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  
  if (isConnected) {
    console.log("==> Mongo Already connected");
    return;
  }

  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URL is not defined in the environment variables.");
    }
    const MONGODB_URI = process.env.MONGODB_URI
    await mongoose.connect(MONGODB_URI, {
      dbName: "keamportal",
      writeConcern: { w: "majority" },
    });
    isConnected = true;
    console.log("==> Mongo Successfully connected");
  } catch (error:any) {
    console.error("==> Connection error:", error.message);
    throw error;
  }
};
