import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return; // Already connected
    }
    await mongoose.connect("mongodb+srv://swan:swan@cluster0.ciovpzc.mongodb.net/?appName=Cluster0");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};