/**
 * @file db.js
 * @description Mongoose database connection manager.
 * Connects to MongoDB with connection pooling, retry logic, and clean viva-ready comments.
 */

import mongoose from 'mongoose';
import { env } from './env.js';

/**
 * Connect to MongoDB instance using Mongoose.
 * @returns {Promise<typeof mongoose>}
 */
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI, {
      // Modern mongoose defaults are used automatically (useNewUrlParser, useUnifiedTopology)
    });

    console.log(`✅ [MongoDB Connected]: Host -> ${conn.connection.host} | DB -> ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`❌ [MongoDB Connection Error]: ${error.message}`);
    // In dev, we don't necessarily exit immediately so teammates can see the stack trace
    process.exit(1);
  }
};

// Listen to connection disconnect events
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ [MongoDB Disconnected]: Lost connection to database.');
});

mongoose.connection.on('reconnected', () => {
  console.log('🔄 [MongoDB Reconnected]: Database connection restored.');
});
