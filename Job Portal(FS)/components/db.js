// ============================================================
// db.js — CareerHub LocalStorage Database (Simulated DB)
// ============================================================

const DB = {
  // ---------- SEED DATA ----------
  seedJobs: [
    {
      id: "j1", title: "Frontend Developer", company: "TechNova Solutions",
      location: "Bangalore", type: "Full-time", category: "Technology",
      salary: "₹8–12 LPA", experience: "1–3 Years",
      description: "We are looking for a passionate Frontend Developer skilled in React, HTML5, CSS3, and JavaScript. You will build responsive UIs for our SaaS platform.",
      requirements: ["React.js", "HTML/CSS", "JavaScript ES6+", "REST APIs", "Git"],
      postedBy: "emp1", postedAt: "2026-04-15", deadline: "2026-05-15",
      logo: "💻", applicants: 34, featured: true
    },
    {
      id: "j2", title: "Data Analyst Intern", company: "DataWorks Analytics",
      location: "Chennai", type: "Internship", category: "Data Science",
      salary: "₹15,000/month", experience: "Fresher",
      description: "Join our data team to analyse business data, build dashboards, and deliver actionable insights. Great learning opportunity for freshers.",
      requirements: ["Python", "SQL", "Excel", "Power BI", "Statistics"],
      postedBy: "emp2", postedAt: "2026-04-14", deadline: "2026-05-10",
      logo: "📊", applicants: 58, featured: true
    },
    {
      id: "j3", title: "Software Engineer", company: "XYZ Solutions",
      location: "Hyderabad", type: "Full-time", category: "Technology",
      salary: "₹10–15 LPA", experience: "2–5 Years",
      description: "Build scalable backend services using Java/Spring Boot. Work on distributed systems, microservices, and cloud-native architecture.",
      requirements: ["Java", "Spring Boot", "MySQL", "Docker", "Microservices"],
      postedBy: "emp3", postedAt: "2026-04-12", deadline: "2026-05-20",
      logo: "⚙️", applicants: 21, featured: false
    },
    {
      id: "j4", title: "UI/UX Designer", company: "CreativeMinds",
      location: "Remote", type: "Remote", category: "Design",
      salary: "₹6–10 LPA", experience: "1–3 Years",
      description: "Design beautiful user experiences for web and mobile apps. Collaborate with product managers and developers to create intuitive interfaces.",
      requirements: ["Figma", "Adobe XD", "Prototyping", "User Research", "Design Systems"],
      postedBy: "emp4", postedAt: "2026-04-10", deadline: "2026-05-05",
      logo: "🎨", applicants: 47, featured: true
    },
    {
      id: "j5", title: "Digital Marketing Executive", company: "GrowthHack Agency",
      location: "Mumbai", type: "Full-time", category: "Marketing",
      salary: "₹4–7 LPA", experience: "0–2 Years",
      description: "Drive digital marketing campaigns across SEO, SEM, and social media. Analyse performance metrics and grow our online presence.",
      requirements: ["SEO/SEM", "Google Ads", "Social Media", "Analytics", "Content"],
      postedBy: "emp5", postedAt: "2026-04-08", deadline: "2026-05-01",
      logo: "📢", applicants: 62, featured: false
    },
    {
      id: "j6", title: "Backend Developer", company: "CloudBase Tech",
      location: "Pune", type: "Full-time", category: "Technology",
      salary: "₹12–18 LPA", experience: "3–6 Years",
      description: "Design and develop high-performance backend APIs. Experience with Node.js, PostgreSQL, and cloud deployments (AWS/GCP) required.",
      requirements: ["Node.js", "PostgreSQL", "AWS", "REST APIs", "TypeScript"],
      postedBy: "emp1", postedAt: "2026-04-07", deadline: "2026-04-30",
      logo: "🖥️", applicants: 29, featured: false
    },
    {
      id: "j7", title: "Machine Learning Engineer", company: "AI Forge Labs",
      location: "Bangalore", type: "Full-time", category: "Data Science",
      salary: "₹18–25 LPA", experience: "2–5 Years",
      description: "Build and deploy ML models for computer vision and NLP applications. Work on cutting-edge AI research projects.",
      requirements: ["Python", "TensorFlow", "PyTorch", "MLOps", "Deep Learning"],
      postedBy: "emp2", postedAt: "2026-04-05", deadline: "2026-05-25",
      logo: "🤖", applicants: 15, featured: true
    },
    {
      id: "j8", title: "HR Recruiter", company: "PeopleFirst HR",
      location: "Delhi", type: "Part-time", category: "Human Resources",
      salary: "₹3–5 LPA", experience: "0–2 Years",
      description: "Source, screen, and recruit candidates for IT roles. Manage end-to-end hiring cycles and build talent pipelines.",
      requirements: ["Recruitment", "LinkedIn", "ATS Tools", "Communication", "HR Basics"],
      postedBy: "emp4", postedAt: "2026-04-03", deadline: "2026-04-28",
      logo: "👥", applicants: 38, featured: false
    },
    {
      id: "j9", title: "Full Stack Developer", company: "StartupNest",
      location: "Remote", type: "Remote", category: "Technology",
      salary: "₹10–16 LPA", experience: "2–4 Years",
      description: "Join a fast-paced startup building a B2B SaaS platform. Own features from database design to pixel-perfect UI.",
      requirements: ["React", "Node.js", "MongoDB", "Docker", "Git"],
      postedBy: "emp3", postedAt: "2026-04-02", deadline: "2026-05-18",
      logo: "🚀", applicants: 52, featured: false
    },
    {
      id: "j10", title: "Finance Analyst", company: "WealthBridge Capital",
      location: "Mumbai", type: "Full-time", category: "Finance",
      salary: "₹7–11 LPA", experience: "1–3 Years",
      description: "Perform financial modelling, budgeting, and variance analysis. Support senior analysts with reports and dashboards.",
      requirements: ["Excel", "Financial Modelling", "Tally", "Accounting", "CA/MBA Finance"],
      postedBy: "emp5", postedAt: "2026-04-01", deadline: "2026-04-30",
      logo: "💰", applicants: 44, featured: false
    },
    {
      id: "j11", title: "Content Writer", company: "WordCraft Studio",
      location: "Remote", type: "Remote", category: "Marketing",
      salary: "₹3–6 LPA", experience: "Fresher",
      description: "Write SEO-optimised blog posts, articles, and website copy for technology and lifestyle brands. Portfolio required.",
      requirements: ["SEO Writing", "Grammar", "Research", "WordPress", "Creativity"],
      postedBy: "emp4", postedAt: "2026-03-30", deadline: "2026-04-25",
      logo: "✍️", applicants: 71, featured: false
    },
    {
      id: "j12", title: "Cloud Solutions Architect", company: "NexGen Cloud",
      location: "Hyderabad", type: "Full-time", category: "Technology",
      salary: "₹22–35 LPA", experience: "5+ Years",
      description: "Architect enterprise-grade cloud solutions on AWS/Azure. Lead technical teams and engage with C-level stakeholders.",
      requirements: ["AWS", "Azure", "Solutions Architecture", "DevOps", "Terraform"],
      postedBy: "emp3", postedAt: "2026-03-28", deadline: "2026-05-10",
      logo: "☁️", applicants: 18, featured: true
    }
  ],

  seedUsers: [
    { id: "emp1", name: "Ravi Kumar", email: "ravi@technova.com", password: "emp123", role: "employer", company: "TechNova Solutions", avatar: "RK" },
    { id: "emp2", name: "Priya Singh", email: "priya@dataworks.com", password: "emp123", role: "employer", company: "DataWorks Analytics", avatar: "PS" },
    { id: "emp3", name: "Arun Mehta", email: "arun@xyz.com", password: "emp123", role: "employer", company: "XYZ Solutions", avatar: "AM" },
    { id: "emp4", name: "Sneha Joshi", email: "sneha@creative.com", password: "emp123", role: "employer", company: "CreativeMinds", avatar: "SJ" },
    { id: "emp5", name: "Kiran Reddy", email: "kiran@growthhack.com", password: "emp123", role: "employer", company: "GrowthHack Agency", avatar: "KR" },
    { id: "u1", name: "Arjun Sharma", email: "arjun@gmail.com", password: "user123", role: "seeker", skills: "React, JavaScript, Node.js", avatar: "AS" },
    { id: "u2", name: "Divya Nair", email: "divya@gmail.com", password: "user123", role: "seeker", skills: "Python, Data Science, SQL", avatar: "DN" }
  ],

  seedApplications: [
    { id: "a1", jobId: "j1", userId: "u1", appliedAt: "2026-04-16", status: "Under Review", coverLetter: "I am very interested in this role." },
    { id: "a2", jobId: "j2", userId: "u2", appliedAt: "2026-04-15", status: "Shortlisted", coverLetter: "I love data analytics." }
  ],

  // ---------- INIT ----------
  init() {
    if (!localStorage.getItem("ch_initialized")) {
      localStorage.setItem("ch_jobs", JSON.stringify(this.seedJobs));
      localStorage.setItem("ch_users", JSON.stringify(this.seedUsers));
      localStorage.setItem("ch_applications", JSON.stringify(this.seedApplications));
      localStorage.setItem("ch_bookmarks", JSON.stringify([]));
      localStorage.setItem("ch_initialized", "true");
    }
  },

  // ---------- JOBS ----------
  getJobs() { return JSON.parse(localStorage.getItem("ch_jobs") || "[]"); },
  getJob(id) { return this.getJobs().find(j => j.id === id); },
  addJob(job) {
    const jobs = this.getJobs();
    job.id = "j" + Date.now();
    job.postedAt = new Date().toISOString().split("T")[0];
    job.applicants = 0;
    job.featured = false;
    jobs.unshift(job);
    localStorage.setItem("ch_jobs", JSON.stringify(jobs));
    return job;
  },
  deleteJob(id) {
    const jobs = this.getJobs().filter(j => j.id !== id);
    localStorage.setItem("ch_jobs", JSON.stringify(jobs));
  },

  // ---------- USERS ----------
  getUsers() { return JSON.parse(localStorage.getItem("ch_users") || "[]"); },
  getUser(id) { return this.getUsers().find(u => u.id === id); },
  login(email, password) {
    return this.getUsers().find(u => u.email === email && u.password === password) || null;
  },
  register(data) {
    const users = this.getUsers();
    if (users.find(u => u.email === data.email)) return { error: "Email already registered." };
    const user = {
      id: "u" + Date.now(),
      ...data,
      avatar: data.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    };
    users.push(user);
    localStorage.setItem("ch_users", JSON.stringify(users));
    return user;
  },
  updateUser(id, updates) {
    const users = this.getUsers().map(u => u.id === id ? { ...u, ...updates } : u);
    localStorage.setItem("ch_users", JSON.stringify(users));
  },

  // ---------- APPLICATIONS ----------
  getApplications() { return JSON.parse(localStorage.getItem("ch_applications") || "[]"); },
  getApplicationsByUser(userId) { return this.getApplications().filter(a => a.userId === userId); },
  getApplicationsByJob(jobId) { return this.getApplications().filter(a => a.jobId === jobId); },
  hasApplied(jobId, userId) { return this.getApplications().some(a => a.jobId === jobId && a.userId === userId); },
  apply(jobId, userId, coverLetter, phone) {
    if (this.hasApplied(jobId, userId)) return { error: "Already applied." };
    const apps = this.getApplications();
    const app = { id: "a" + Date.now(), jobId, userId, appliedAt: new Date().toISOString().split("T")[0], status: "Under Review", coverLetter, phone };
    apps.push(app);
    localStorage.setItem("ch_applications", JSON.stringify(apps));
    // increment applicant count
    const jobs = this.getJobs().map(j => j.id === jobId ? { ...j, applicants: (j.applicants || 0) + 1 } : j);
    localStorage.setItem("ch_jobs", JSON.stringify(jobs));
    return app;
  },

  // ---------- BOOKMARKS ----------
  getBookmarks(userId) { return JSON.parse(localStorage.getItem("ch_bookmarks") || "[]").filter(b => b.userId === userId).map(b => b.jobId); },
  toggleBookmark(jobId, userId) {
    let bookmarks = JSON.parse(localStorage.getItem("ch_bookmarks") || "[]");
    const exists = bookmarks.findIndex(b => b.jobId === jobId && b.userId === userId);
    if (exists >= 0) bookmarks.splice(exists, 1);
    else bookmarks.push({ jobId, userId });
    localStorage.setItem("ch_bookmarks", JSON.stringify(bookmarks));
    return exists < 0; // true = added
  },

  // ---------- SESSION ----------
  getSession() { const s = localStorage.getItem("ch_session"); return s ? JSON.parse(s) : null; },
  setSession(user) { localStorage.setItem("ch_session", JSON.stringify(user)); },
  clearSession() { localStorage.removeItem("ch_session"); },

  // ---------- STATS (Admin) ----------
  getStats() {
    return {
      totalJobs: this.getJobs().length,
      totalUsers: this.getUsers().filter(u => u.role === "seeker").length,
      totalEmployers: this.getUsers().filter(u => u.role === "employer").length,
      totalApplications: this.getApplications().length
    };
  }
};
