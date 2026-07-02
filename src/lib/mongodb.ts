import mongoose from "mongoose";
import dns from "node:dns";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cached = global.mongooseCache || {
  conn: null,
  promise: null,
};

global.mongooseCache = cached;

export async function connectDB() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("Please define the MONGODB_URI environment variable.");
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = connectWithDnsFallback(mongoUri);
  }

  cached.conn = await cached.promise;

  return cached.conn;
}

async function connectWithDnsFallback(mongoUri: string) {
  try {
    return await mongoose.connect(mongoUri, {
      dbName: "rentease",
    });
  } catch (error) {
    if (!shouldRetryWithPublicDns(error)) {
      throw error;
    }

    const originalDnsServers = dns.getServers();

    try {
      dns.setServers(["8.8.8.8", "1.1.1.1"]);

      return await mongoose.connect(mongoUri, {
        dbName: "rentease",
      });
    } finally {
      dns.setServers(originalDnsServers);
    }
  }
}

function shouldRetryWithPublicDns(error: unknown) {
  if (!(error instanceof Error)) {
    return false;
  }

  return error.message.includes("querySrv") && error.message.includes("ECONNREFUSED");
}