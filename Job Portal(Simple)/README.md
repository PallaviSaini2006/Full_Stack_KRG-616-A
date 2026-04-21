# 💼 JobPortal — Full Stack Web Project

> My first full-stack web application! Built using **React**, **JavaScript**, **HTML**, **CSS**, and designed to connect with a **Spring Boot REST API backend**.
>
> **Course:** KRG-616-A — Full Stack Development  
> **Developer:** Pallavi Saini

---

## 📌 About This Project

This is a Job Portal website where:
- Job Seekers can browse and apply for jobs
- Employers can post jobs and manage listings

**Note:** The backend is simulated using `localStorage`. In a real production setup, the frontend would connect to a Spring Boot REST API running at `http://localhost:8080`.

---

## 🛠️ Technologies Used

| Technology | What it's used for |
|---|---|
| **HTML5** | Structure of the web pages |
| **CSS3** | Styling and layout |
| **JavaScript (ES6)** | Logic and interactivity |
| **React 18 (CDN)** | Component-based UI framework |
| **Babel Standalone** | To use JSX in the browser without build tools |
| **Spring Boot** *(simulated)* | REST API backend (localhost:8080) |
| **localStorage** | Local data storage (replaces the actual database for demo) |

---

## 📁 Project Structure

```
Job Portal(Simple)/
├── index.html              ← Main HTML file (entry point)
├── style.css               ← All CSS styles
├── app.js                  ← Main React App component
└── components/
    ├── api.js              ← API layer (simulates Spring Boot REST calls)
    ├── Navbar.js           ← Navigation bar component
    ├── Auth.js             ← Login and Register forms
    ├── JobCard.js          ← Single job card component
    ├── JobList.js          ← Browse jobs page with search & filter
    ├── Dashboard.js        ← User dashboard (seeker & employer)
    └── PostJob.js          ← Employer: post a new job form
```

---

## 🚀 How to Run

1. Clone this repository:
   ```bash
   git clone https://github.com/PallaviSaini2006/Full_Stack_KRG-616-A.git
   ```

2. Open `Job Portal(Simple)/index.html` in your browser (double-click it).

3. Wait about 5 seconds for React + Babel to load.

> ⚠️ No installation needed. No Node.js required. Just open in browser!

---

## 🔐 Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Job Seeker | arjun@gmail.com | user123 |
| Employer | ravi@technova.com | emp123 |

---

## 🌐 Features

### For Job Seekers
- Register / Login as a Job Seeker
- Browse all job listings
- Filter by job type, category, location
- Search by keyword
- View detailed job information
- Apply to jobs with a note
- Track applied jobs in dashboard
- Edit profile / skills

### For Employers
- Register / Login as an Employer
- Post new job listings
- View posted jobs in dashboard
- Delete job listings

---

## 🔌 Simulated Spring Boot API

The `components/api.js` file shows how the frontend would interact with a Spring Boot REST backend. Each function logs the API call to the browser console:

```
[API] GET http://localhost:8080/api/jobs
[API] Response 200 OK - returned 10 jobs

[API] POST http://localhost:8080/api/auth/login { email: "arjun@gmail.com" }
[API] Response 200 OK - login success for user id=100
```

Open **Developer Tools → Console** to see these logs while using the app!

---

## 📸 Pages

| Page | Description |
|------|-------------|
| **Home** | Hero section, featured jobs, why us |
| **Browse Jobs** | Search/filter + job cards |
| **Job Detail** | Full description, skills, salary, apply |
| **Dashboard (Seeker)** | My applications table, edit profile |
| **Dashboard (Employer)** | My posted jobs, delete jobs |
| **Post a Job** | Form to publish a new listing |

---

## 📄 License

This project is for educational/academic use only (KRG-616-A coursework).
