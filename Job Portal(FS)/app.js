// ============================================================
// app.js — Main CareerHub React Application
// ============================================================

DB.init(); // Initialize localStorage database on first load

function App() {
  const [user, setUser] = React.useState(DB.getSession());
  const [view, setView] = React.useState("home");
  const [authModal, setAuthModal] = React.useState(null); // "login" | "register" | null
  const [navFilters, setNavFilters] = React.useState(null);
  const [toast, setToast] = React.useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    setAuthModal(null);
    showToast(`🎉 Welcome, ${loggedInUser.name}!`);
    setView("home");
  };

  const handleLogout = () => {
    DB.clearSession();
    setUser(null);
    setView("home");
    showToast("👋 You have been logged out.");
  };

  const handleNavigate = (targetView, filters = null) => {
    setNavFilters(filters);
    setView(targetView);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAuthOpen = (mode) => {
    setAuthModal(mode);
  };

  // Resolve which featured jobs to show on homepage
  const featuredJobs = DB.getJobs().filter(j => j.featured).slice(0, 6);
  const bookmarks = user ? DB.getBookmarks(user.id) : [];

  const handleApplyFromHome = (job) => {
    if (!user) { setAuthModal("login"); return; }
    handleNavigate("jobs", { query: job.title });
  };

  const handleToggleBookmarkFromHome = (jobId) => {
    if (!user) { setAuthModal("login"); return; }
    DB.toggleBookmark(jobId, user.id);
    showToast("Bookmark updated!");
  };

  return (
    <div className="app-root">
      {/* Global Toast */}
      {toast && <div className={`toast toast-${toast.type}`}>{toast.msg}</div>}

      {/* Auth Modal */}
      {authModal && (
        <AuthModal mode={authModal} onClose={() => setAuthModal(null)} onLogin={handleLogin} />
      )}

      {/* Navbar — always visible */}
      <Navbar
        user={user}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        onAuthOpen={handleAuthOpen}
        currentView={view}
      />

      {/* Main Content */}
      <main className="main-content">

        {/* HOME */}
        {view === "home" && (
          <>
            <Hero onNavigate={handleNavigate} onAuthOpen={handleAuthOpen} user={user} />

            {/* Featured Jobs Section on Home */}
            <section className="home-featured">
              <div className="section-header">
                <div>
                  <h2 className="section-title">Featured <span className="text-accent">Opportunities</span></h2>
                  <p className="section-sub">Hand-picked jobs from top companies</p>
                </div>
                <button className="btn btn-outline" onClick={() => handleNavigate("jobs")}>
                  View All Jobs <i className="fa fa-arrow-right"></i>
                </button>
              </div>
              <div className="jobs-grid">
                {featuredJobs.map(job => (
                  <JobCard
                    key={job.id}
                    job={job}
                    user={user}
                    onApply={handleApplyFromHome}
                    onViewDetail={(j) => handleNavigate("jobs", { query: j.title })}
                    bookmarks={bookmarks}
                    onToggleBookmark={handleToggleBookmarkFromHome}
                  />
                ))}
              </div>
            </section>

            {/* Why CareerHub Section */}
            <section className="why-section">
              <h2 className="section-title">Why Choose <span className="text-accent">CareerHub</span>?</h2>
              <div className="why-grid">
                {[
                  { icon: "🔍", title: "Smart Job Matching", desc: "Our intelligent algorithm matches your skills to the most relevant opportunities." },
                  { icon: "⚡", title: "One-Click Apply", desc: "Apply to multiple jobs instantly with your saved profile — no repetitive forms." },
                  { icon: "🏢", title: "Verified Companies", desc: "Every employer on CareerHub is verified, so you can trust every listing." },
                  { icon: "📊", title: "Track Applications", desc: "Monitor your application status and get real-time notifications from employers." },
                  { icon: "🎯", title: "Internship Ready", desc: "Dedicated section for freshers and students with internship & entry-level roles." },
                  { icon: "💬", title: "Career Guidance", desc: "Access expert career tips, resume guides, and interview prep resources free." },
                ].map(item => (
                  <div key={item.title} className="why-card">
                    <span className="why-icon">{item.icon}</span>
                    <h3 className="why-title">{item.title}</h3>
                    <p className="why-desc">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
              <div className="cta-content">
                <h2>Ready to Land Your Dream Job?</h2>
                <p>Join 50,000+ professionals who found their career on CareerHub.</p>
                <div className="cta-btns">
                  <button className="btn btn-primary btn-lg" onClick={() => handleNavigate("jobs")}>
                    🔍 Browse Jobs
                  </button>
                  {!user && (
                    <button className="btn btn-outline-white btn-lg" onClick={() => setAuthModal("register")}>
                      ✨ Create Free Account
                    </button>
                  )}
                </div>
              </div>
            </section>
          </>
        )}

        {/* JOBS / INTERNSHIPS */}
        {(view === "jobs" || view === "internships" || view === "companies") && (
          <JobList
            user={user}
            onAuthOpen={handleAuthOpen}
            initialFilters={view === "internships" ? { ...navFilters, query: "Internship" } : navFilters}
            onNavigate={handleNavigate}
          />
        )}

        {/* DASHBOARD */}
        {view === "dashboard" && (
          <Dashboard user={user} onNavigate={handleNavigate} onAuthOpen={handleAuthOpen} />
        )}

        {/* POST JOB */}
        {view === "postjob" && (
          <PostJob user={user} onNavigate={handleNavigate} onAuthOpen={handleAuthOpen} />
        )}

      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

// ---- Mount React App ----
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));
