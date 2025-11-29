// lib/mongodb.js
import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  const uri = process.env.MONGODB_URI;

  // 🔍 DEBUG
  console.log("🔍 MONGODB_URI defined?", !!uri);
  if (!uri) {
    console.error("❌ MONGODB_URI is NOT defined in this environment");
    throw new Error("MONGODB_URI is not defined");
  }

  try {
    const conn = await mongoose.connect(uri, {
      dbName: "vyoma", // or your db name
    });

    isConnected = conn.connections[0].readyState;
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}
