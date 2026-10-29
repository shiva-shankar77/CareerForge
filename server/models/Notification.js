/**
 * @file Notification.js
 * @description Realtime in-app notification model.
 * Stores alerts dispatched to students and recruiters for application updates, interview invites, and system announcements.
 */

import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Notification recipient is required'],
      index: true
    },
    title: {
      type: String,
      required: [true, 'Notification title is required'],
      trim: true
    },
    message: {
      type: String,
      required: [true, 'Notification message is required'],
      trim: true
    },
    type: {
      type: String,
      enum: ['Application', 'Interview', 'Job', 'System', 'Admin'],
      default: 'System'
    },
    isRead: {
      type: Boolean,
      default: false,
      index: true
    },
    link: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

notificationSchema.index({ recipient: 1, isRead: 1, createdAt: -1 });

export const Notification = mongoose.model('Notification', notificationSchema);
