import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  
  if (isConnected) {
    console.log("==> Mongo Already connected");
    return;
  }

  try {
    // Ensure the environment variable name is correct
    const mongoURI = process.env.MANGODB_URL;  // Update to the correct env variable
    
    if (!mongoURI) {
      throw new Error("MongoDB URI is not defined in the environment variables.");
    }

    await mongoose.connect(mongoURI, {
      dbName: "keamportal", // Database name
      writeConcern: { w: 'majority' }, // Ensure data consistency
    });

    isConnected = true;
    console.log("==> Mongo Successfully connected");

  } catch (error) {
    console.error('Connection error:', error);
    // You can throw an error if you want to stop the process in case of a connection issue
    // throw error;
  }
};
