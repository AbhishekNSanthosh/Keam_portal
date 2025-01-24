import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  
  if (isConnected) {
    console.log("==> Mongo Already connected");
    return;
  }

  try {
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL is not defined in the environment variables.");
    }
    
    await mongoose.connect(process.env.MONGODB_URL, {
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
