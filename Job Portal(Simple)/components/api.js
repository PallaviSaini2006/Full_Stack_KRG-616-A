// ============================================================
// api.js - Simulated Spring Boot REST API Layer
// In a real project, these functions would call our Spring Boot
// backend running at http://localhost:8080
// ============================================================

// Base URL for our Spring Boot backend (local development)
const API_BASE_URL = "http://localhost:8080/api";

// ----- LocalStorage keys (used as fallback when Spring Boot is not running) -----
const KEYS = {
  jobs: "jp_jobs",
  users: "jp_users",
  applications: "jp_applications",
  session: "jp_session",
  initialized: "jp_initialized"
};

// ----- Seed data (same data we would load from Spring Boot + MySQL) -----
const SEED_JOBS = [
  {
    id: 1, title: "Frontend Developer", company: "TechNova Solutions",
    location: "Bangalore", type: "Full-time", category: "Technology",
    salary: "₹8–12 LPA", experience: "1–3 Years",
    description: "We are looking for a Frontend Developer skilled in React and JavaScript. You will build responsive UIs for our web platform.",
    requirements: ["React.js", "HTML/CSS", "JavaScript", "REST APIs", "Git"],
    postedBy: 1, postedAt: "2026-04-15", logo: "💻", applicants: 34
  },
  {
    id: 2, title: "Data Analyst Intern", company: "DataWorks Analytics",
    location: "Chennai", type: "Internship", category: "Data Science",
    salary: "₹15,000/month", experience: "Fresher",
    description: "Join our data team to analyse business data and build dashboards. Good learning opportunity for freshers and students.",
    requirements: ["Python", "SQL", "Excel", "Power BI"],
    postedBy: 2, postedAt: "2026-04-14", logo: "📊", applicants: 58
  },
  {
    id: 3, title: "Software Engineer", company: "XYZ Solutions",
    location: "Hyderabad", type: "Full-time", category: "Technology",
    salary: "₹10–15 LPA", experience: "2–5 Years",
    description: "Build scalable backend services using Java and Spring Boot. Work on microservices and REST APIs.",
    requirements: ["Java", "Spring Boot", "MySQL", "Docker"],
    postedBy: 3, postedAt: "2026-04-12", logo: "⚙️", applicants: 21
  },
  {
    id: 4, title: "UI/UX Designer", company: "CreativeMinds",
    location: "Remote", type: "Remote", category: "Design",
    salary: "₹6–10 LPA", experience: "1–3 Years",
    description: "Design user interfaces for web and mobile apps. Collaborate with development teams to create user-friendly designs.",
    requirements: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    postedBy: 4, postedAt: "2026-04-10", logo: "🎨", applicants: 47
  },
  {
    id: 5, title: "Digital Marketing Executive", company: "GrowthHack Agency",
    location: "Mumbai", type: "Full-time", category: "Marketing",
    salary: "₹4–7 LPA", experience: "0–2 Years",
    description: "Run digital marketing campaigns on SEO, Google Ads, and social media. Freshers welcome.",
    requirements: ["SEO", "Google Ads", "Social Media", "Content Writing"],
    postedBy: 5, postedAt: "2026-04-08", logo: "📢", applicants: 62
  },
  {
    id: 6, title: "Backend Developer", company: "CloudBase Tech",
    location: "Pune", type: "Full-time", category: "Technology",
    salary: "₹12–18 LPA", experience: "3–6 Years",
    description: "Build and maintain high-performance backend APIs using Node.js and PostgreSQL.",
    requirements: ["Node.js", "PostgreSQL", "AWS", "REST APIs"],
    postedBy: 1, postedAt: "2026-04-07", logo: "🖥️", applicants: 29
  },
  {
    id: 7, title: "Machine Learning Engineer", company: "AI Forge Labs",
    location: "Bangalore", type: "Full-time", category: "Data Science",
    salary: "₹18–25 LPA", experience: "2–5 Years",
    description: "Build and deploy ML models for NLP and computer vision applications.",
    requirements: ["Python", "TensorFlow", "PyTorch", "Deep Learning"],
    postedBy: 2, postedAt: "2026-04-05", logo: "🤖", applicants: 15
  },
  {
    id: 8, title: "HR Recruiter", company: "PeopleFirst HR",
    location: "Delhi", type: "Part-time", category: "Human Resources",
    salary: "₹3–5 LPA", experience: "0–2 Years",
    description: "Screen and recruit candidates for IT and non-IT roles. Manage end-to-end hiring process.",
    requirements: ["Recruitment", "LinkedIn", "Communication", "MS Office"],
    postedBy: 4, postedAt: "2026-04-03", logo: "👥", applicants: 38
  },
  {
    id: 9, title: "Full Stack Developer", company: "StartupNest",
    location: "Remote", type: "Remote", category: "Technology",
    salary: "₹10–16 LPA", experience: "2–4 Years",
    description: "Join a startup building a SaaS platform. Work on both frontend (React) and backend (Node.js/Spring Boot).",
    requirements: ["React", "Node.js", "MongoDB", "Spring Boot", "Git"],
    postedBy: 3, postedAt: "2026-04-02", logo: "🚀", applicants: 52
  },
  {
    id: 10, title: "Finance Analyst", company: "WealthBridge Capital",
    location: "Mumbai", type: "Full-time", category: "Finance",
    salary: "₹7–11 LPA", experience: "1–3 Years",
    description: "Perform financial modelling, budgeting, and reporting. Support senior analysts with dashboards.",
    requirements: ["Excel", "Financial Modelling", "Accounting", "Tally"],
    postedBy: 5, postedAt: "2026-04-01", logo: "💰", applicants: 44
  }
];

const SEED_USERS = [
  { id: 1, name: "Ravi Kumar", email: "ravi@technova.com", password: "emp123", role: "employer", company: "TechNova Solutions" },
  { id: 2, name: "Priya Singh", email: "priya@dataworks.com", password: "emp123", role: "employer", company: "DataWorks Analytics" },
  { id: 3, name: "Arun Mehta", email: "arun@xyz.com", password: "emp123", role: "employer", company: "XYZ Solutions" },
  { id: 4, name: "Sneha Joshi", email: "sneha@creative.com", password: "emp123", role: "employer", company: "CreativeMinds" },
  { id: 5, name: "Kiran Reddy", email: "kiran@growthhack.com", password: "emp123", role: "employer", company: "GrowthHack Agency" },
  { id: 100, name: "Arjun Sharma", email: "arjun@gmail.com", password: "user123", role: "seeker", skills: "React, JavaScript, Node.js" },
  { id: 101, name: "Divya Nair", email: "divya@gmail.com", password: "user123", role: "seeker", skills: "Python, Data Science, SQL" }
];

const SEED_APPLICATIONS = [
  { id: 1, jobId: 1, userId: 100, appliedAt: "2026-04-16", status: "Under Review", note: "Excited about this role!" },
  { id: 2, jobId: 2, userId: 101, appliedAt: "2026-04-15", status: "Shortlisted", note: "I love data analytics." }
];

// ----- Initialize localStorage (runs once, like a DB seed) -----
function initDB() {
  if (!localStorage.getItem(KEYS.initialized)) {
    console.log("[DB] First run - seeding data into localStorage (simulating Spring Boot DB load)");
    localStorage.setItem(KEYS.jobs, JSON.stringify(SEED_JOBS));
    localStorage.setItem(KEYS.users, JSON.stringify(SEED_USERS));
    localStorage.setItem(KEYS.applications, JSON.stringify(SEED_APPLICATIONS));
    localStorage.setItem(KEYS.initialized, "true");
  }
}

// -------------------------------------------------------
// API functions - each one simulates a Spring Boot endpoint
// In a real project: fetch(`${API_BASE_URL}/jobs`)
// -------------------------------------------------------

// GET /api/jobs
async function apiGetJobs() {
  console.log(`[API] GET ${API_BASE_URL}/jobs`);
  // Simulating network delay like a real HTTP call would have
  await new Promise(resolve => setTimeout(resolve, 100));
  const jobs = JSON.parse(localStorage.getItem(KEYS.jobs) || "[]");
  console.log(`[API] Response 200 OK - returned ${jobs.length} jobs`);
  return jobs;
}

// GET /api/jobs/:id
async function apiGetJob(id) {
  console.log(`[API] GET ${API_BASE_URL}/jobs/${id}`);
  await new Promise(resolve => setTimeout(resolve, 80));
  const jobs = JSON.parse(localStorage.getItem(KEYS.jobs) || "[]");
  return jobs.find(j => j.id === id) || null;
}

// POST /api/jobs
async function apiCreateJob(jobData) {
  console.log(`[API] POST ${API_BASE_URL}/jobs`, jobData);
  await new Promise(resolve => setTimeout(resolve, 400));
  const jobs = JSON.parse(localStorage.getItem(KEYS.jobs) || "[]");
  const newJob = {
    ...jobData,
    id: Date.now(),
    postedAt: new Date().toISOString().split("T")[0],
    applicants: 0
  };
  jobs.unshift(newJob);
  localStorage.setItem(KEYS.jobs, JSON.stringify(jobs));
  console.log(`[API] Response 201 Created - job id=${newJob.id}`);
  return newJob;
}

// DELETE /api/jobs/:id
async function apiDeleteJob(id) {
  console.log(`[API] DELETE ${API_BASE_URL}/jobs/${id}`);
  await new Promise(resolve => setTimeout(resolve, 300));
  const jobs = JSON.parse(localStorage.getItem(KEYS.jobs) || "[]").filter(j => j.id !== id);
  localStorage.setItem(KEYS.jobs, JSON.stringify(jobs));
  console.log(`[API] Response 200 OK - job deleted`);
}

// POST /api/auth/login
async function apiLogin(email, password) {
  console.log(`[API] POST ${API_BASE_URL}/auth/login { email: "${email}" }`);
  await new Promise(resolve => setTimeout(resolve, 600));
  const users = JSON.parse(localStorage.getItem(KEYS.users) || "[]");
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    console.log(`[API] Response 200 OK - login success for user id=${user.id}`);
    // In Spring Boot this would return a JWT token
    return { success: true, user };
  } else {
    console.log(`[API] Response 401 Unauthorized - bad credentials`);
    return { success: false, error: "Invalid email or password." };
  }
}

// POST /api/auth/register
async function apiRegister(data) {
  console.log(`[API] POST ${API_BASE_URL}/auth/register`);
  await new Promise(resolve => setTimeout(resolve, 700));
  const users = JSON.parse(localStorage.getItem(KEYS.users) || "[]");
  if (users.find(u => u.email === data.email)) {
    console.log(`[API] Response 409 Conflict - email already exists`);
    return { success: false, error: "Email is already registered." };
  }
  const newUser = { ...data, id: Date.now() };
  users.push(newUser);
  localStorage.setItem(KEYS.users, JSON.stringify(users));
  console.log(`[API] Response 201 Created - new user id=${newUser.id}`);
  return { success: true, user: newUser };
}

// GET /api/applications?userId=xxx
async function apiGetMyApplications(userId) {
  console.log(`[API] GET ${API_BASE_URL}/applications?userId=${userId}`);
  await new Promise(resolve => setTimeout(resolve, 150));
  const apps = JSON.parse(localStorage.getItem(KEYS.applications) || "[]");
  const userApps = apps.filter(a => a.userId === userId);
  console.log(`[API] Response 200 OK - ${userApps.length} applications`);
  return userApps;
}

// GET /api/applications?jobId=xxx (for employer)
async function apiGetJobApplications(jobId) {
  console.log(`[API] GET ${API_BASE_URL}/applications?jobId=${jobId}`);
  await new Promise(resolve => setTimeout(resolve, 150));
  const apps = JSON.parse(localStorage.getItem(KEYS.applications) || "[]");
  return apps.filter(a => a.jobId === jobId);
}

// POST /api/applications
async function apiApplyJob(jobId, userId, note) {
  console.log(`[API] POST ${API_BASE_URL}/applications { jobId: ${jobId}, userId: ${userId} }`);
  await new Promise(resolve => setTimeout(resolve, 500));
  const apps = JSON.parse(localStorage.getItem(KEYS.applications) || "[]");
  // check if already applied
  if (apps.find(a => a.jobId === jobId && a.userId === userId)) {
    return { success: false, error: "You have already applied for this job." };
  }
  const newApp = { id: Date.now(), jobId, userId, appliedAt: new Date().toISOString().split("T")[0], status: "Under Review", note };
  apps.push(newApp);
  localStorage.setItem(KEYS.applications, JSON.stringify(apps));
  // update applicant count on job
  const jobs = JSON.parse(localStorage.getItem(KEYS.jobs) || "[]").map(j =>
    j.id === jobId ? { ...j, applicants: (j.applicants || 0) + 1 } : j
  );
  localStorage.setItem(KEYS.jobs, JSON.stringify(jobs));
  console.log(`[API] Response 201 Created - applied successfully`);
  return { success: true, application: newApp };
}

// PUT /api/users/:id
async function apiUpdateUser(id, updates) {
  console.log(`[API] PUT ${API_BASE_URL}/users/${id}`, updates);
  await new Promise(resolve => setTimeout(resolve, 300));
  const users = JSON.parse(localStorage.getItem(KEYS.users) || "[]").map(u =>
    u.id === id ? { ...u, ...updates } : u
  );
  localStorage.setItem(KEYS.users, JSON.stringify(users));
  const updated = users.find(u => u.id === id);
  console.log(`[API] Response 200 OK - user updated`);
  return updated;
}

// GET /api/users?employerId=xxx (get employer's jobs)
async function apiGetEmployerJobs(employerId) {
  console.log(`[API] GET ${API_BASE_URL}/jobs?postedBy=${employerId}`);
  await new Promise(resolve => setTimeout(resolve, 150));
  const jobs = JSON.parse(localStorage.getItem(KEYS.jobs) || "[]");
  return jobs.filter(j => j.postedBy === employerId);
}

// ----- Session helpers (would be JWT token in real Spring Boot app) -----
function getSession() {
  const s = localStorage.getItem(KEYS.session);
  return s ? JSON.parse(s) : null;
}
function setSession(user) {
  localStorage.setItem(KEYS.session, JSON.stringify(user));
}
function clearSession() {
  localStorage.removeItem(KEYS.session);
}

// Run DB initialization
initDB();
