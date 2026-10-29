# CareerForge – AI-Powered Placement & Interview Platform

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-green.svg)](https://reactjs.org/)
[![Socket.io](https://img.shields.io/badge/Realtime-Socket.io-black.svg)](https://socket.io/)
[![Google Gemini API](https://img.shields.io/badge/AI-Google%20Gemini-blue.svg)](https://ai.google.dev/)
[![Tailwind CSS](https://img.shields.io/badge/CSS-TailwindCSS-38B2AC.svg)](https://tailwindcss.com/)

CareerForge is a comprehensive, production-grade MERN platform designed for modern campus placement drives, automated resume ATS parsing, job portal management, and real-time AI-powered technical mock interviews.

This repository contains the **shared foundation and architecture** built for a 5-member development team, ensuring parallel development with zero merge conflicts.

---

## 🏛️ System Architecture

CareerForge follows a decoupled monorepo architecture:

```
project/
├── client/          # Vite + React 18 + React Router + Tailwind CSS + Axios
├── server/          # Node.js + Express + Mongoose + Socket.io + JWT + bcrypt
├── docs/            # Centralized API and WebSocket contracts
├── CONTRIBUTING.md  # 5-member ownership matrix & git branch rules
└── README.md        # Documentation, setup guide & viva defense notes
```

### Server Layering (Separation of Concerns)
```
HTTP Request ──> Route Guard (verifyToken, authorizeRoles, rateLimiter)
             ──> Validator (express-validator)
             ──> Controller (unpacks req, invokes service)
             ──> Service (business logic, transactions, AI/hashing)
             ──> Mongoose Model (schema validation, indexes)
             ──> Database (MongoDB)
```

---

## 👥 5-Member Team Ownership Map

| Member | Feature Domain | Focus Areas | Branch |
|---|---|---|---|
| **Member 1** | **Student Profile & ATS Resume** | Profile updates, resume upload, ATS score calculation | `feature/student-resume` |
| **Member 2** | **Jobs & Application Portal** | Job CRUD, filtering, student job applications, status tracker | `feature/jobs-applications` |
| **Member 3** | **Gemini AI Engine & Sessions** | Question generation, answer evaluation, interview metrics | `feature/ai-interview` |
| **Member 4** | **Socket.io Live Room & Alerts** | Real-time question/answer flow, live score events, alerts | `feature/realtime-notifications` |
| **Member 5** | **Admin, Analytics & DevOps** | Recruiter verification, user moderation, KPI charts | `feature/admin-deploy` |
| **Architect** | **Shared Foundation & Auth** | JWT Auth, DB connection, models, design system, layouts | `main` |

---

## 🚀 Quick Setup Guide

### Prerequisites
- **Node.js**: v18+ (v24 LTS recommended)
- **MongoDB**: Running locally on `mongodb://127.0.0.1:27017` or a MongoDB Atlas URI

### 1. Server Setup
```bash
cd server
npm install
cp .env.example .env
# Edit .env if required (e.g. PORT=5000, MONGO_URI, JWT_SECRET)

# Seed database with sample users and jobs:
npm run seed

# Run server with hot-reload:
npm run dev
```

The server will start on `http://localhost:5000`.

### 2. Client Setup
```bash
cd client
npm install
npm run dev
```

The client will start on `http://localhost:5173`.

---

## 🔑 Demo Seed Credentials (Pre-populated)

When you run `npm run seed`, the following test accounts are populated in your local MongoDB:

| Role | Email | Password | Status | Default Landing Route |
|---|---|---|---|---|
| **Admin** | `admin@careerforge.dev` | `Admin@123` | Active & Verified | `/admin/dashboard` |
| **Recruiter 1** | `recruiter1@techcorp.com` | `Recruiter@123` | Company Verified | `/recruiter/dashboard` |
| **Recruiter 2** | `recruiter2@innovate.io` | `Recruiter@123` | Pending Verification | `/recruiter/dashboard` |
| **Student 1** | `student1@uni.edu` | `Student@123` | Active & Verified | `/student/jobs` |
| **Student 2** | `student2@uni.edu` | `Student@123` | Active & Verified | `/student/jobs` |
| **Student 3** | `student3@uni.edu` | `Student@123` | Active & Verified | `/student/jobs` |

*Note: You can also register a fresh Student or Recruiter directly from the UI Signup page!*

---

## 🎓 Viva Preparation & Architectural Talking Points

When presenting CareerForge to examiners and faculty:

1. **Why Plain JavaScript instead of TypeScript?**
   - Eliminates build step overhead for college environments, reduces compile errors for junior teammates, and allows direct native execution with clean JSDoc annotations.
2. **How are merge conflicts prevented across 5 developers?**
   - The team uses **file boundary isolation**: each developer owns dedicated controller/service/page files. All 9 teammate API routes are pre-registered in `app.js` and all frontend routes are pre-registered in `AppRoutes.jsx`. Teammates simply implement their assigned files without touching `server.js` or `App.jsx`.
3. **How does Authentication & Role Authorization work?**
   - Passwords are salt-hashed using `bcryptjs` (cost factor 10).
   - Stateless JWT tokens are signed using `HS256` and verified via `verifyToken` middleware.
   - `authorizeRoles('admin', 'recruiter')` performs RBAC checks before the request reaches the controller.
   - Students cannot self-register as `admin`.
4. **How are duplicate job applications prevented?**
   - Enforced at the database layer using a Mongoose compound unique index: `applicationSchema.index({ student: 1, job: 1 }, { unique: true })`.
5. **How does Socket.io integrate with JWT auth?**
   - Socket handshake middleware extracts the token from `socket.handshake.auth.token`, verifies it, and attaches `socket.user`. Unauthenticated connections are rejected before handshake completion.
6. **Centralized Error Handling:**
   - Routes are wrapped with `asyncHandler` which catches Promise rejections and passes them to `next(err)`. The central `errorHandler` converts `ApiError`, MongoDB duplicate key (E11000), and validation errors into predictable `{ success: false, message, error }` JSON envelopes.

---

## 📜 License
Educational Project - Built for GLA University Placement & Interview Preparation.
