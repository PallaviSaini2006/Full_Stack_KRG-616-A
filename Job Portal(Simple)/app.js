// ============================================================
// app.js — Main Application (React Root Component)
// This is a Full-Stack project:
//   Frontend: React + CSS + JavaScript
//   Backend: Spring Boot REST API (simulated at http://localhost:8080)
// ============================================================

function App() {
  // ----- App-level State -----
  const [user, setUser] = React.useState(getSession());      // logged in user
  const [page, setPage] = React.useState("home");            // current page/view
  const [authModal, setAuthModal] = React.useState(null);    // "login" | "register" | null
  const [toast, setToast] = React.useState(null);            // { msg, type }
  const [featuredJobs, setFeaturedJobs] = React.useState([]);
  const [homeLoading, setHomeLoading] = React.useState(true);
  const [apiConnected, setApiConnected] = React.useState(false);

  // Load featured jobs for homepage when app starts
  React.useEffect(() => {
    async function loadHomepageJobs() {
      setHomeLoading(true);
      const jobs = await apiGetJobs();
      // Show first 6 jobs as 'featured'
      setFeaturedJobs(jobs.slice(0, 6));
      setHomeLoading(false);
      // Simulate "API connected" after first successful call
      setTimeout(() => setApiConnected(true), 1200);
    }
    loadHomepageJobs();
  }, []);

  // Show a toast notification
  function showToast(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  // Navigate to a page
  function navigate(targetPage) {
    setPage(targetPage);
    window.scrollTo(0, 0);
  }

  // Handle successful login/register
  function handleLogin(loggedInUser) {
    setUser(loggedInUser);
    setAuthModal(null);
    showToast("Welcome, " + loggedInUser.name + "!", "success");
  }

  // Logout
  function handleLogout() {
    clearSession();
    setUser(null);
    navigate("home");
    showToast("You have been logged out.", "success");
  }

  return (
    <div className="app-root">

      {/* Toast Notification */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          {toast.msg}
        </div>
      )}

      {/* Auth Modal (Login / Register) */}
      {authModal && (
        <AuthModal
          defaultTab={authModal}
          onClose={() => setAuthModal(null)}
          onLogin={handleLogin}
        />
      )}

      {/* Navbar */}
      <Navbar
        user={user}
        currentPage={page}
        onNavigate={navigate}
        onLogout={handleLogout}
        onOpenLogin={() => setAuthModal("login")}
        onOpenRegister={() => setAuthModal("register")}
      />

      {/* Main Content */}
      <main className="main-content">

        {/* ========== HOME PAGE ========== */}
        {page === "home" && (
          <div>
            {/* Hero Section */}
            <div className="hero-section">
              <h1>Find Your Dream Job</h1>
              <p>Connecting job seekers with top companies across India. Powered by Spring Boot + React.</p>

              {/* Search Box */}
              <div className="hero-search">
                <input type="text" placeholder="Search jobs, companies, skills..." />
                <button onClick={() => navigate("jobs")}>
                  Search Jobs
                </button>
              </div>

              {/* Stats */}
              <div className="hero-stats">
                <div className="stat-box">
                  <div className="number">10+</div>
                  <div className="label">Job Listings</div>
                </div>
                <div className="stat-box">
                  <div className="number">7+</div>
                  <div className="label">Companies</div>
                </div>
                <div className="stat-box">
                  <div className="number">5+</div>
                  <div className="label">Categories</div>
                </div>
              </div>
            </div>

            {/* Featured Jobs Section */}
            <div className="featured-section">
              <div className="container">
                <div className="section-header">
                  <div>
                    <h2 className="section-title">Latest Job Listings</h2>
                    <p className="section-subtitle">Fresh opportunities from across the country</p>
                  </div>
                  <button className="btn btn-primary" onClick={() => navigate("jobs")}>
                    View All Jobs →
                  </button>
                </div>

                {homeLoading ? (
                  <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Fetching jobs from Spring Boot API...</p>
                  </div>
                ) : (
                  <div className="jobs-grid">
                    {featuredJobs.map(job => (
                      <JobCard
                        key={job.id}
                        job={job}
                        user={user}
                        onApply={() => {
                          if (!user) { setAuthModal("login"); return; }
                          navigate("jobs");
                        }}
                        onViewDetail={() => navigate("jobs")}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Why JobPortal Section */}
            <div className="section" style={{background: "#fff"}}>
              <div className="container">
                <h2 className="section-title" style={{textAlign: "center", marginBottom: "30px"}}>Why Use JobPortal?</h2>
                <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px"}}>
                  {[
                    { icon: "🔍", title: "Easy Job Search", desc: "Search and filter jobs by location, type, and category." },
                    { icon: "📋", title: "Simple Apply", desc: "Apply for jobs with one click. No complicated forms." },
                    { icon: "🏢", title: "Post Jobs", desc: "Employers can post job listings and manage applicants." },
                    { icon: "📊", title: "Track Applications", desc: "Job seekers can track their submitted applications." }
                  ].map(item => (
                    <div key={item.title} style={{background: "#f8f9fa", border: "1px solid #ddd", borderRadius: "6px", padding: "20px", textAlign: "center"}}>
                      <div style={{fontSize: "2rem", marginBottom: "10px"}}>{item.icon}</div>
                      <h3 style={{fontSize: "15px", marginBottom: "8px"}}>{item.title}</h3>
                      <p style={{fontSize: "13px", color: "#666"}}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Section */}
            {!user && (
              <div style={{backgroundColor: "#1a73e8", padding: "50px 20px", textAlign: "center", color: "white"}}>
                <h2 style={{marginBottom: "12px", fontSize: "1.6rem"}}>Ready to Get Started?</h2>
                <p style={{marginBottom: "24px", opacity: 0.9}}>Create a free account to apply for jobs or post job listings.</p>
                <div style={{display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap"}}>
                  <button className="btn btn-outline" onClick={() => setAuthModal("register")}>
                    Create Free Account
                  </button>
                  <button
                    className="btn"
                    style={{backgroundColor: "#ffd700", color: "#333"}}
                    onClick={() => navigate("jobs")}
                  >
                    Browse Jobs
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========== BROWSE JOBS PAGE ========== */}
        {page === "jobs" && (
          <JobList
            user={user}
            onOpenAuth={(tab) => setAuthModal(tab)}
            onNavigate={navigate}
          />
        )}

        {/* ========== DASHBOARD PAGE ========== */}
        {page === "dashboard" && (
          <Dashboard
            user={user}
            onNavigate={navigate}
            onOpenAuth={(tab) => setAuthModal(tab)}
          />
        )}

        {/* ========== POST JOB PAGE ========== */}
        {page === "postjob" && (
          <PostJob
            user={user}
            onNavigate={navigate}
            onOpenAuth={(tab) => setAuthModal(tab)}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">Job<span>Portal</span></div>
          <p>A Full-Stack project using React, JavaScript, CSS and Spring Boot (REST API).</p>
          <p style={{fontSize: "12px", marginTop: "4px"}}>Made by Pallavi Saini · KRG-616-A</p>
          <div className="footer-links">
            <a href="#" onClick={e => { e.preventDefault(); navigate("home"); }}>Home</a>
            <a href="#" onClick={e => { e.preventDefault(); navigate("jobs"); }}>Browse Jobs</a>
            {user && <a href="#" onClick={e => { e.preventDefault(); navigate("dashboard"); }}>Dashboard</a>}
          </div>
        </div>
      </footer>

      {/* API Status Indicator (shows the "backend" connection status) */}
      <div className="api-status">
        <div className={`api-dot ${apiConnected ? "connected" : ""}`}></div>
        <span>
          {apiConnected ? "API Connected · localhost:8080" : "Connecting to API..."}
        </span>
      </div>

    </div>
  );
}

// Mount our React App to the DOM
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
