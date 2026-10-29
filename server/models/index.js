/**
 * @file index.js
 * @description Central export file for all Mongoose models in CareerForge.
 * Enables clean, unified imports across controllers and seed scripts:
 * 
 * Example:
 *   import { User, Job, Application } from '../models/index.js';
 */

export { User } from './User.js';
export { StudentProfile } from './StudentProfile.js';
export { RecruiterProfile } from './RecruiterProfile.js';
export { Resume } from './Resume.js';
export { Job } from './Job.js';
export { Application } from './Application.js';
export { InterviewSession } from './InterviewSession.js';
export { Notification } from './Notification.js';
