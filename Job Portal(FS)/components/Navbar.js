// ============================================================
// Navbar.js — CareerHub Navigation Component
// ============================================================

function Navbar({ user, onNavigate, onLogout, onAuthOpen, currentView }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", view: "home" },
    { label: "Jobs", view: "jobs" },
    { label: "Internships", view: "internships" },
    { label: "Companies", view: "companies" },
  ];

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-logo" onClick={() => onNavigate("home")}>
          <span className="logo-icon">💼</span>
          <span className="logo-text">Career<span className="logo-accent">Hub</span></span>
        </div>

        {/* Desktop Links */}
        <ul className={`nav-links ${menuOpen ? "nav-links-open" : ""}`}>
          {navLinks.map(link => (
            <li key={link.view}>
              <a
                href="#"
                className={`nav-link ${currentView === link.view ? "nav-link-active" : ""}`}
                onClick={(e) => { e.preventDefault(); onNavigate(link.view); setMenuOpen(false); }}
              >
                {link.label}
              </a>
            </li>
          ))}
          {user && (
            <li>
              <a
                href="#"
                className={`nav-link ${currentView === "dashboard" ? "nav-link-active" : ""}`}
                onClick={(e) => { e.preventDefault(); onNavigate("dashboard"); setMenuOpen(false); }}
              >
                {user.role === "employer" ? "My Jobs" : "Dashboard"}
              </a>
            </li>
          )}
          {user && user.role === "employer" && (
            <li>
              <a
                href="#"
                className={`nav-link ${currentView === "postjob" ? "nav-link-active" : ""}`}
                onClick={(e) => { e.preventDefault(); onNavigate("postjob"); setMenuOpen(false); }}
              >
                Post a Job
              </a>
            </li>
          )}
        </ul>

        {/* Auth Buttons */}
        <div className="nav-auth">
          {user ? (
            <div className="nav-user-menu">
              <div className="nav-avatar" title={user.name}>{user.avatar || user.name[0]}</div>
              <div className="nav-dropdown">
                <div className="dropdown-info">
                  <span className="dropdown-name">{user.name}</span>
                  <span className="dropdown-role">{user.role === "employer" ? "Employer" : "Job Seeker"}</span>
                </div>
                <button className="dropdown-item" onClick={() => onNavigate("dashboard")}>
                  <i className="fa fa-tachometer-alt"></i> Dashboard
                </button>
                {user.role === "employer" && (
                  <button className="dropdown-item" onClick={() => onNavigate("postjob")}>
                    <i className="fa fa-plus-circle"></i> Post Job
                  </button>
                )}
                <button className="dropdown-item dropdown-logout" onClick={onLogout}>
                  <i className="fa fa-sign-out-alt"></i> Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <button className="btn btn-outline" onClick={() => onAuthOpen("login")}>Login</button>
              <button className="btn btn-primary" onClick={() => onAuthOpen("register")}>Register</button>
            </>
          )}
          {/* Hamburger */}
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
