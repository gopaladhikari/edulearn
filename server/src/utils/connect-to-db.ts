import mongoose from "mongoose";
import { appName } from "./constants.js";

const MAX_RETRIES = 3;
const RETRY_INTERVAL = 5000;

class DatabaseConnection {
  retryCount: number;
  isConnected: boolean;

  constructor() {
    this.retryCount = 0;
    this.isConnected = false;

    mongoose.connection.on("connected", () => {
      this.isConnected = true;
      console.log("🟢 MongoDB connected successfully.");
    });

    mongoose.connection.on("disconnected", () => {
      this.isConnected = false;
      console.log(
        "🟠 MongoDB disconnected. Mongoose will attempt to reconnect..."
      );
    });

    mongoose.connection.on("error", (err) => {
      console.error("🔴 MongoDB connection error:", err);
    });

    process.on("SIGTERM", () => this.handleAppTermination("SIGTERM"));
    process.on("SIGINT", () => this.handleAppTermination("SIGINT"));
  }

  async connect() {
    try {
      const connectionOptions: mongoose.ConnectOptions = {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4, // Use IPv4
        appName,
        dbName: appName,
      };

      if (process.env.NODE_ENV === "development") mongoose.set("debug", true);

      await mongoose.connect(process.env.MONGODB_URI!, connectionOptions);

      this.retryCount = 0;
    } catch (error) {
      console.error(
        `🔴 Failed to connect to MongoDB. Attempt ${this.retryCount + 1} of ${MAX_RETRIES}`
      );
      await this.handleConnectionError();
    }
  }

  private async handleConnectionError() {
    if (this.retryCount < MAX_RETRIES) {
      this.retryCount++;

      await new Promise((res) => setTimeout(res, RETRY_INTERVAL));

      return this.connect();
    } else {
      console.error(
        "💥 Max connection retries exhausted. Exiting application."
      );
      process.exit(1);
    }
  }

  private async handleAppTermination(signal: string) {
    try {
      await mongoose.connection.close();
      console.log(
        `\n🛑 ${signal} received. MongoDB connection closed gracefully.`
      );
      process.exit(0);
    } catch (error) {
      console.error("💥 Error during database disconnection:", error);
      process.exit(1);
    }
  }

  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      isReady: mongoose.connection.readyState,
      host: mongoose.connection.host,
      name: mongoose.connection.name,
    };
  }
}

// singleton instance

export const dbConnection = new DatabaseConnection();
