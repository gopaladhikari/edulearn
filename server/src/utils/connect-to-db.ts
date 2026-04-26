import mongoose from "mongoose";

const mongodbUri = process.env.MONGODB_URI;

if (!mongodbUri) throw new Error("MongoDB URI is required.");

export const connectToDb = async () => {
  const conn = await mongoose.connect(mongodbUri, {
    appName: "edulearn",
  });
  console.log(conn.connection.host);
};
