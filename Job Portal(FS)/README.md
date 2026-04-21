# 💼 CareerHub — Full-Stack Job Portal

> A modern, full-stack job portal web application built with **React**, **JavaScript**, and a **localStorage-based database** layer. Designed as a final year Full-Stack project.

![CareerHub](https://img.shields.io/badge/React-18-blue?logo=react) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?logo=javascript) ![CSS](https://img.shields.io/badge/CSS-Vanilla-purple) ![Status](https://img.shields.io/badge/Status-Complete-brightgreen)

---

## 🌐 Live Demo

Open `index.html` directly in any modern browser — **no server or installation required!**

---

## ✨ Features

### 👨‍💼 For Job Seekers
- 🔍 Browse 12+ real job listings across categories
- 🔎 Real-time search with keyword, location & category filters
- 📋 One-click job application with cover letter
- 🔖 Bookmark / save jobs for later
- 📊 Personal dashboard to track applications & status
- 👤 Edit profile & skills

### 🏢 For Employers
- 📝 Post new job listings with live preview
- 👥 View all applicants for each job
- 🗑️ Manage and delete job posts
- 📈 Employer dashboard with stats

### 🔐 Authentication System
- Register as Job Seeker or Employer
- Login with session persistence (localStorage)
- Form validation with helpful error messages

### 🎨 UI/UX
- Animated gradient hero section with floating cards
- Glassmorphism navbar with scroll effect
- Responsive design (mobile, tablet, desktop)
- Micro-animations and hover effects
- Toast notifications
- Animated counter for stats

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend Framework** | React 18 (CDN + Babel Standalone) |
| **UI Styling** | Vanilla CSS with CSS Variables |
| **Icons** | Font Awesome 6 |
| **Fonts** | Google Fonts — Inter |
| **Database** | Browser `localStorage` (JSON-based) |
| **Language** | JavaScript ES6+ |

---

## 📁 Project Structure

```
Job Portal(FS)/
├── index.html              ← Main entry point (self-contained)
├── style.css               ← Complete design system (~800 lines)
├── app.js                  ← Main React App + routing
└── components/
    ├── db.js               ← localStorage database layer
    ├── Navbar.js           ← Responsive navigation
    ├── Hero.js             ← Animated landing hero
    ├── Auth.js             ← Login + Register modals
    ├── JobCard.js          ← Reusable job card component
    ├── JobList.js          ← Jobs page with filters & pagination
    ├── Dashboard.js        ← Seeker & Employer dashboards
    ├── PostJob.js          ← Employer post-job form
    └── Footer.js           ← Site footer with newsletter
```

---

## 🚀 How to Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/PallaviSaini2006/Full_Stack_KRG-616-A.git
   ```

2. **Open the project:**
   ```
   Double-click index.html → opens in Chrome
   ```

> ⚠️ Wait ~5 seconds on first load for Babel to compile JSX.

---

## 🧪 Demo Login Credentials

| Role | Email | Password |
|------|-------|----------|
| **Job Seeker** | arjun@gmail.com | user123 |
| **Employer** | ravi@technova.com | emp123 |

---

## 📸 Pages & Screens

| Page | Description |
|------|-------------|
| **Home** | Hero section, featured jobs, categories, why-us, CTA |
| **Jobs** | Search + filter sidebar + paginated job cards |
| **Job Detail** | Full description, skills, salary, apply button |
| **Apply Modal** | Phone, cover letter form submission |
| **Dashboard (Seeker)** | Applied jobs, saved jobs, profile editor |
| **Dashboard (Employer)** | Job posts, applicants table, delete jobs |
| **Post a Job** | Full form with live card preview |

---

## 🗄️ Database Design (localStorage)

| Key | Description |
|-----|-------------|
| `ch_jobs` | Job listings array |
| `ch_users` | Registered users array |
| `ch_applications` | Job applications array |
| `ch_bookmarks` | Saved jobs per user |
| `ch_session` | Logged-in user session |

---

## 👩‍💻 Developer

**Pallavi Saini** — Full Stack Web Development Student

---

## 📄 License

This project is for educational/academic purposes.
