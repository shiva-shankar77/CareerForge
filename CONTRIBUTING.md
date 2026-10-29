# Contributing Guidelines – CareerForge

Welcome to **CareerForge (AI-Powered Placement & Interview Platform)**.
This project is built collaboratively by a **5-member team**. To avoid merge conflicts, protect system stability, and ensure everyone can present their feature clearly during viva/evaluations, **all teammates must strictly adhere to this guide**.

---

## 1. Team Ownership Map

Each team member has full ownership and responsibility over their designated slice of the stack. **Never modify files belonging to another member's module without explicit permission.**

| Member | Module Scope | Server Files Owned | Client Files Owned |
|---|---|---|---|
| **Member 1** | **Student Profile & Resume** | `routes/student.routes.js`<br>`routes/resume.routes.js`<br>`controllers/studentController.js`<br>`controllers/resumeController.js`<br>`services/studentService.js`<br>`services/resumeService.js` | `pages/student/Profile.jsx`<br>`pages/student/ResumeBuilder.jsx`<br>`components/student/ResumeViewer.jsx` |
| **Member 2** | **Jobs, Applications & Recruiter** | `routes/job.routes.js`<br>`routes/application.routes.js`<br>`routes/recruiter.routes.js`<br>`controllers/jobController.js`<br>`controllers/applicationController.js`<br>`controllers/recruiterController.js`<br>`services/jobService.js`<br>`services/applicationService.js` | `pages/student/Jobs.jsx`<br>`pages/student/MyApplications.jsx`<br>`pages/recruiter/*` |
| **Member 3** | **AI Services & Interview REST** | `routes/ai.routes.js`<br>`routes/interview.routes.js`<br>`controllers/aiController.js`<br>`controllers/interviewController.js`<br>`services/geminiService.js`<br>`services/interviewService.js` | `pages/student/InterviewHistory.jsx`<br>`pages/student/Performance.jsx`<br>`components/ai/*` |
| **Member 4** | **Socket.io Live Interview & Notifications** | `socket/interviewSocket.js`<br>`socket/notificationSocket.js`<br>`routes/notification.routes.js`<br>`controllers/notificationController.js`<br>`services/notificationService.js` | `pages/student/MockInterview.jsx`<br>`components/interview/LiveInterviewRoom.jsx`<br>`components/navigation/NotificationDropdown.jsx` |
| **Member 5** | **Admin, Analytics & Deployment** | `routes/admin.routes.js`<br>`controllers/adminController.js`<br>`services/adminService.js`<br>`scripts/*`<br>`Dockerfile` / deployment configs | `pages/admin/*`<br>`components/admin/AnalyticsCharts.jsx` |
| **Architect / Shared** | **Shared Foundation & Auth** | `server.js`, `app.js`, `config/*`<br>`middleware/*`, `utils/*`<br>`models/*`, `routes/auth.routes.js`<br>`controllers/authController.js`<br>`services/authService.js` | `components/common/*`<br>`layouts/*`, `routes/*`<br>`context/AuthContext.jsx`<br>`services/api.js`<br>`pages/auth/*`, `pages/Landing.jsx` |

---

## 2. Git Branch Rules

1. **`main` is protected**: Never commit directly to `main`.
2. Every teammate must work in their assigned feature branch:
   - Member 1: `feature/student-resume`
   - Member 2: `feature/jobs-applications`
   - Member 3: `feature/ai-interview`
   - Member 4: `feature/realtime-notifications`
   - Member 5: `feature/admin-deploy`
3. Before pushing, pull latest changes from `main`:
   ```bash
   git checkout feature/<your-branch>
   git fetch origin
   git merge origin/main
   ```

---

## 3. Commit Message Convention

Follow standard Conventional Commits so that git history is clean and ready for viva review:

- `feat(student): add resume PDF upload and ATS parser`
- `feat(jobs): implement recruiter job creation with salary range`
- `feat(ai): integrate Gemini API for interview question generation`
- `feat(socket): emit live transcript and timer updates`
- `feat(admin): add recruiter verification toggle`
- `fix(auth): handle JWT token expiration gracefully`
- `docs(api): update job application response contract`
- `chore: update dependencies`

---

## 4. "Only Edit Files You Own" Policy

- **Models**: If you need an additional field in a shared model (`models/User.js`, `models/Job.js`, etc.), communicate with the team before modifying.
- **Routes & Middleware**: Do not touch `middleware/auth.js` or global error handlers unless fixing an architectural bug.
- **Client Components**: Reusable components (`Button`, `Card`, `Modal`, `Input`, `Table`) live in `src/components/common/`. Do not overwrite their core props; extend them via standard props or wrapper components.

---

## 5. Coding Standards for Viva Presentation

- Write **plain JavaScript** (ES6+ with `import`/`export`).
- Every route handler should be wrapped with `asyncHandler`.
- Never throw unhandled rejections—throw `new ApiError(statusCode, message)`.
- Use the standardized response helper: `res.status(200).json(apiResponse(true, "Message", data))`.
- Document non-trivial logic with comments explaining **Why** and **How** so you can answer viva questions confidently.
