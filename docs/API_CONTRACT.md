# CareerForge – API Contract & Realtime Protocol

This document serves as the single source of truth for the REST API endpoints and Socket.io events across all 5 modules. All teammates must build controllers and frontend services strictly conforming to this contract.

---

## 1. Global Standard Response Format

All REST responses return a consistent JSON envelope:

### Success Response (2xx)
```json
{
  "success": true,
  "message": "Operation description",
  "data": { ... }
}
```

### Error Response (4xx / 5xx)
```json
{
  "success": false,
  "message": "Human-readable error explanation",
  "error": {
    "code": "ERROR_CODE",
    "details": []
  }
}
```

### Authentication Header
For protected endpoints, supply the JWT token in the HTTP Authorization header:
```http
Authorization: Bearer <jwt_token>
```

---

## 2. Authentication Endpoints (`/api/auth`)
*Owner: Architect / Foundation*

| Method | Endpoint | Role | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register a new student or recruiter |
| `POST` | `/api/auth/login` | Public | Authenticate user & receive JWT token |
| `GET` | `/api/auth/me` | Authenticated | Retrieve current user profile and role |

#### `POST /api/auth/register`
- **Request Body:**
  ```json
  {
    "name": "Alex Johnson",
    "email": "alex@university.edu",
    "password": "SecurePassword123!",
    "role": "student", // "student" | "recruiter" (admin registration forbidden)
    "companyName": "TechCorp" // required only if role is recruiter
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "Registration successful",
    "data": {
      "user": {
        "_id": "660c1...",
        "name": "Alex Johnson",
        "email": "alex@university.edu",
        "role": "student",
        "isVerified": true
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```

#### `POST /api/auth/login`
- **Request Body:**
  ```json
  {
    "email": "alex@university.edu",
    "password": "SecurePassword123!"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "user": {
        "_id": "660c1...",
        "name": "Alex Johnson",
        "email": "alex@university.edu",
        "role": "student",
        "isVerified": true
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```

#### `GET /api/auth/me`
- **Headers:** `Authorization: Bearer <token>`
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "User profile fetched",
    "data": {
      "user": {
        "_id": "660c1...",
        "name": "Alex Johnson",
        "email": "alex@university.edu",
        "role": "student",
        "isVerified": true,
        "profile": { ... }
      }
    }
  }
  ```

---

## 3. Student Profile Endpoints (`/api/students`)
*Owner: Member 1*

| Method | Endpoint | Role | Description |
|---|---|---|---|
| `GET` | `/api/students/profile` | Student | Get own profile with skills & education |
| `PUT` | `/api/students/profile` | Student | Update personal info, bio, skills, education |
| `GET` | `/api/students/:id` | Recruiter, Admin | View public student profile |

- **`PUT /api/students/profile` Body:**
  ```json
  {
    "headline": "Full Stack MERN Developer | AI Enthusiast",
    "bio": "Passionate about building scalable web applications.",
    "phone": "+1 555-0199",
    "skills": ["JavaScript", "React", "Node.js", "MongoDB", "Tailwind CSS"],
    "education": [
      {
        "degree": "B.Tech in Computer Science",
        "college": "GLA University",
        "cgpa": 8.8,
        "passingYear": 2026
      }
    ],
    "githubUrl": "https://github.com/alex",
    "linkedinUrl": "https://linkedin.com/in/alex"
  }
  ```

---

## 4. Resume Endpoints (`/api/resumes`)
*Owner: Member 1*

| Method | Endpoint | Role | Description |
|---|---|---|---|
| `POST` | `/api/resumes/upload` | Student | Upload resume PDF / Docx |
| `GET` | `/api/resumes/my-resumes` | Student | Get all uploaded resumes & ATS scores |
| `POST` | `/api/resumes/parse-ats` | Student | Parse uploaded resume & calculate ATS match |
| `DELETE` | `/api/resumes/:id` | Student | Delete a resume |

---

## 5. Recruiter Endpoints (`/api/recruiters`)
*Owner: Member 2*

| Method | Endpoint | Role | Description |
|---|---|---|---|
| `GET` | `/api/recruiters/profile` | Recruiter | Get recruiter profile & company info |
| `PUT` | `/api/recruiters/profile` | Recruiter | Update company details, website & logo |
| `GET` | `/api/recruiters/stats` | Recruiter | Get dashboard summary (active jobs, applicant count) |

---

## 6. Jobs Endpoints (`/api/jobs`)
*Owner: Member 2*

| Method | Endpoint | Role | Description |
|---|---|---|---|
| `GET` | `/api/jobs` | Public / All | Browse & filter job listings (search, tags, location) |
| `GET` | `/api/jobs/:id` | Public / All | Get full job details |
| `POST` | `/api/jobs` | Recruiter | Create a new job vacancy |
| `PUT` | `/api/jobs/:id` | Recruiter | Update an existing job vacancy |
| `DELETE` | `/api/jobs/:id` | Recruiter, Admin | Delete / Archive job |
| `GET` | `/api/jobs/recruiter/my-jobs` | Recruiter | View all jobs posted by current recruiter |

- **`POST /api/jobs` Body:**
  ```json
  {
    "title": "Junior Full Stack Engineer",
    "description": "Develop full-stack web applications using React and Node.js.",
    "location": "Remote / Bengaluru",
    "jobType": "Full-time", // "Full-time" | "Part-time" | "Internship" | "Remote"
    "salaryRange": { "min": 600000, "max": 1000000, "currency": "INR" },
    "requirements": ["Proficient in JavaScript", "Familiarity with MongoDB and Express"],
    "skillsRequired": ["React", "Node.js", "Express", "MongoDB"],
    "experienceLevel": "Entry Level (0-2 years)",
    "vacancies": 3,
    "deadline": "2026-12-31T23:59:59.000Z"
  }
  ```

---

## 7. Job Application Endpoints (`/api/applications`)
*Owner: Member 2*

| Method | Endpoint | Role | Description |
|---|---|---|---|
| `POST` | `/api/applications` | Student | Apply to a job (student+job unique index) |
| `GET` | `/api/applications/my-applications` | Student | View all jobs applied to with current status |
| `GET` | `/api/applications/job/:jobId` | Recruiter | View all applicants for a specific job |
| `PATCH` | `/api/applications/:id/status` | Recruiter | Update status (`Shortlisted`, `Rejected`, `Selected`) |

---

## 8. AI Service Endpoints (`/api/ai`)
*Owner: Member 3*

| Method | Endpoint | Role | Description |
|---|---|---|---|
| `POST` | `/api/ai/resume-feedback` | Student | Send resume text to Gemini for ATS suggestions |
| `POST` | `/api/ai/generate-questions` | Student | Generate role-specific technical interview questions |
| `POST` | `/api/ai/evaluate-answer` | Student | Evaluate candidate's verbal or written answer |

---

## 9. Interview Session Endpoints (`/api/interviews`)
*Owners: Member 3 & Member 4*

| Method | Endpoint | Role | Description |
|---|---|---|---|
| `POST` | `/api/interviews/create` | Student | Initialize mock interview session |
| `GET` | `/api/interviews/history` | Student | View past mock interview sessions |
| `GET` | `/api/interviews/:sessionId` | Student, Admin | Fetch interview transcript, breakdown scores & feedback |
| `POST` | `/api/interviews/:sessionId/submit` | Student | Conclude interview & generate overall report |

---

## 10. Notification Endpoints (`/api/notifications`)
*Owner: Member 4*

| Method | Endpoint | Role | Description |
|---|---|---|---|
| `GET` | `/api/notifications` | Authenticated | Get current user's notifications (sorted by latest) |
| `PATCH` | `/api/notifications/:id/read` | Authenticated | Mark a single notification as read |
| `PATCH` | `/api/notifications/read-all` | Authenticated | Mark all notifications as read |

---

## 11. Admin Endpoints (`/api/admin`)
*Owner: Member 5*

| Method | Endpoint | Role | Description |
|---|---|---|---|
| `GET` | `/api/admin/dashboard-stats` | Admin | Total users, active jobs, applications, sessions |
| `GET` | `/api/admin/users` | Admin | List all registered users with filter/search |
| `PATCH` | `/api/admin/users/:id/block` | Admin | Toggle block/unblock on a user |
| `GET` | `/api/admin/recruiters/pending` | Admin | List unverified recruiter registrations |
| `PATCH` | `/api/admin/recruiters/:id/verify` | Admin | Verify or reject recruiter company credentials |

---

## 12. Socket.io Real-Time Event Protocol
*Owner: Member 4*

Socket connection handshake requires JWT:
```javascript
import { io } from "socket.io-client";
const socket = io("http://localhost:5000", {
  auth: { token: localStorage.getItem("careerforge_token") }
});
```

### Client -> Server Events
| Event Name | Payload | Description |
|---|---|---|
| `interview:start` | `{ sessionId: "660c..." }` | Signals candidate is in room ready for Question 1 |
| `interview:answer` | `{ sessionId: "660c...", questionId: 1, transcript: "Text...", timeTakenSeconds: 45 }` | Candidate submits answer for active question |

### Server -> Client Events
| Event Name | Payload | Description |
|---|---|---|
| `interview:question` | `{ questionId: 1, questionText: "Explain React Virtual DOM...", category: "Frontend", timeLimit: 120 }` | Pushes the next question to candidate's screen |
| `interview:evaluation` | `{ questionId: 1, score: 8.5, feedback: "Great depth on reconciliation..." }` | Pushes interim AI feedback for the answered question |
| `interview:complete` | `{ sessionId: "660c...", overallScore: 82, summary: "Strong candidate..." }` | Concludes interview session with final report |
| `notification:new` | `{ id: "...", title: "Application Shortlisted!", message: "TechCorp viewed your resume", link: "/student/applications" }` | Emitted to `user:<userId>` room in real time |
