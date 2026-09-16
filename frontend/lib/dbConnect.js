import mongoose from 'mongoose';
import dns from 'node:dns';

if (process.env.NEXT_RUNTIME === 'nodejs' || typeof window === 'undefined') {
  try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
  } catch (error) {
    console.error('Failed to set DNS servers in dbConnect.js:', error);
  }
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env');
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      family: 4, // Force IPv4 routing
      serverSelectionTimeoutMS: 5000, // Fail fast in 5 seconds instead of 30s
      connectTimeoutMS: 5000,          // Connection timeout 5s
    };

    cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;

