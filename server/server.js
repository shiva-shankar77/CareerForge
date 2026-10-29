/**
 * @file server.js
 * @description Main Server Entry Point.
 * Initializes HTTP server, connects to MongoDB, attaches authenticated Socket.io engine,
 * and exports getIO() so any service or controller can emit real-time events.
 */

import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import jwt from 'jsonwebtoken';
import app from './app.js';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';
import { User } from './models/User.js';

// Create native Node HTTP Server wrapping Express app
const server = http.createServer(app);

// Initialize Socket.io instance
let io = null;

export const initSocket = (httpServer) => {
  io = new SocketIOServer(httpServer, {
    cors: {
      origin: [env.CLIENT_URL, 'http://localhost:5173', 'http://127.0.0.1:5173'],
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  // Socket.io JWT Authentication Middleware
  io.use(async (socket, next) => {
    try {
      const token =
        socket.handshake.auth?.token ||
        socket.handshake.headers?.authorization?.replace('Bearer ', '');

      if (!token) {
        return next(new Error('Socket Authentication Error: Token required in handshake auth'));
      }

      // Verify token
      const decoded = jwt.verify(token, env.JWT_SECRET);
      
      // Verify user exists and is not blocked
      const user = await User.findById(decoded.id).select('_id name role isBlocked');
      if (!user || user.isBlocked) {
        return next(new Error('Socket Authentication Error: Unauthorized or blocked account'));
      }

      // Attach user info to socket
      socket.user = user;
      next();
    } catch (err) {
      next(new Error(`Socket Authentication Failed: ${err.message}`));
    }
  });

  // Socket Connection Lifecycle
  io.on('connection', (socket) => {
    const userId = socket.user._id.toString();
    console.log(`⚡ [Socket Connected]: User ${socket.user.name} (${userId}) | Socket ID: ${socket.id}`);

    // Join personal user notification room: 'user:<userId>'
    socket.join(`user:${userId}`);

    // =========================================================================
    // EVENT HANDLER STUBS FOR MEMBER 4 (feature/realtime-notifications)
    // Implement live interview state and notification handling below:
    // =========================================================================

    /**
     * @event interview:start
     * Triggered when candidate enters mock interview room
     */
    socket.on('interview:start', (data) => {
      console.log(`[Socket] interview:start received from ${userId}:`, data);
      // Member 4: emit interview:question to room interview:<sessionId>
    });

    /**
     * @event interview:answer
     * Triggered when candidate finishes answering a question
     */
    socket.on('interview:answer', (data) => {
      console.log(`[Socket] interview:answer received from ${userId}:`, data);
      // Member 4: pass transcript to Member 3 AI evaluator, then emit interview:evaluation
    });

    /**
     * @event disconnect
     */
    socket.on('disconnect', (reason) => {
      console.log(`🔌 [Socket Disconnected]: User ${socket.user.name} | Reason: ${reason}`);
    });
  });

  return io;
};

/**
 * Accessor function to get initialized Socket.io instance from any controller/service.
 * Example:
 *   import { getIO } from '../server.js';
 *   getIO().to(`user:${studentId}`).emit('notification:new', payload);
 */
export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io has not been initialized yet!');
  }
  return io;
};

// Bootstrap Server & DB
const startServer = async () => {
  try {
    // 1. Connect to MongoDB
    await connectDB();

    // 2. Initialize Socket.io
    initSocket(server);

    // 3. Listen on specified PORT
    server.listen(env.PORT, () => {
      console.log('====================================================');
      console.log(`🚀 CareerForge Server Running in [${env.NODE_ENV}] mode`);
      console.log(`🌐 REST API:    http://localhost:${env.PORT}/api`);
      console.log(`🩺 Health Check: http://localhost:${env.PORT}/health`);
      console.log(`⚡ Socket.io:   Active on ws://localhost:${env.PORT}`);
      console.log('====================================================');
    });
  } catch (err) {
    console.error('Fatal Server Boot Error:', err);
    process.exit(1);
  }
};

startServer();

export { app, server };
